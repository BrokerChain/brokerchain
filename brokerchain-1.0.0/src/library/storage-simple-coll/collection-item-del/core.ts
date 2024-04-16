// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { collection_get } from "../collection-get/export.js";
import { cache_collection_get } from "../cache-collection-get/export.js";
import { cache_collection_set } from "../cache-collection-set/export.js";
import { disk_collection_item_del } from "../disk-collection-item-del/export.js";
import { queue_add } from "../_queue/index.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.collection-item-del");
    log.variable("input", input);
    const { namespace, key, item_id } = input;

    try {
        // [note-1]
        // always load collection first, this is important not only because need to return the removed item
        // the simple stragety is not so fast but the logic is robost
        // optimize the logic later (only load the target maybe)

        // [note-2]
        // the collection_get pushs itself in the queue
        // to avoid a queue request in another queue request, which will never finish, the collection_get
        // is not invoked in the queue

        await collection_get(
            log,
            { namespace, key },
            {
                empty: () => {
                    // it's ok, just don' care here
                },
                ok: () => {
                    // ignore, the returned collection is not used here
                    // to avoid data race problem
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        // ok, create a request in queue now

        // [dangerous] Dining Philosophers problem
        // don't invoke cb.xxx() in queue_add()
        // or serous bugs happen that never return and task never return
        const target = await queue_add(log, async () => {
            // update cache first

            const coll = await cache_collection_get(
                log,
                { namespace, key },
                {
                    none: async () => {
                        // not found, create a empty collection in cache
                        const new_coll = {
                            namespace,
                            key,
                            metadata: {},
                            items: [] as { id: string; [key: string]: any }[]
                        };
                        log.println("collection not found, create a empty one in cache");
                        await cache_collection_set(log, new_coll, {
                            ok: () => {
                                // ok
                            },
                            fail: (err) => {
                                throw err;
                            }
                        });
                        return new_coll;
                    },
                    ok: async (coll) => {
                        return coll;
                    },
                    fail: async (err) => {
                        throw err;
                    }
                }
            );

            // remove from cache

            let target: Output | null = null;

            coll.items = coll.items.filter((item) => {
                let match = item.id === item_id;
                if (match) {
                    target = item;
                }
                return !match;
            });

            if (!target) {
                // return cb.none(); // don't do this
                return null;
            }

            log.println("update cache ok");

            // write to disk now

            await disk_collection_item_del(
                log,
                { namespace, key, item_id },
                {
                    ok: () => {
                        // ignore
                    },
                    fail: (err) => {
                        throw err;
                    }
                }
            );

            log.println("update disk ok");

            // return cb.ok(target); // don't do this
            return target;
        });

        if (target) {
            return cb.ok(target);
        } else {
            return cb.none();
        }
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
