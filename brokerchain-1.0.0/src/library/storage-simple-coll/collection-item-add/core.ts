// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { collection_get } from "../collection-get/export.js";
import { cache_collection_get } from "../cache-collection-get/export.js";
import { cache_collection_set } from "../cache-collection-set/export.js";
import { disk_collection_item_add } from "../disk-collection-item-add/export.js";
import { queue_add } from "../_queue/index.js";
// import { cache_obj } from "../_cache/index.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.collection-item-add");
    log.variable("input", input);
    const { namespace, key, item } = input;

    try {
        // [note-1]
        // always load collection first, this is important to avoid the bug:
        // - add item first when collection is not loaded
        // - then the cache is not empty anymore cause the new item is there
        // - read from the collection and the bug happens:
        // - only one item is there, and the program think the item is the only one in the collection
        // - but the truth is the collection is not loaded actually

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
        await queue_add(log, async () => {
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

            // override the same id one

            coll.items = coll.items.filter((existing_item) => {
                if (existing_item.id === item.id) {
                    log.println("remove existing one with same id to replace: " + JSON.stringify(existing_item));
                    return false;
                } else {
                    return true;
                }
            });
            coll.items.push(item);
            await cache_collection_set(log, coll, {
                ok: () => {
                    // ok
                },
                fail: (err) => {
                    throw err;
                }
            });
            log.println("update cache ok");
            // log.variable_debug("coll", coll);
            // log.variable_debug("cache_obj", cache_obj);

            // write to disk now

            await disk_collection_item_add(
                log,
                { namespace, key, item },
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
        });

        return cb.ok({});
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
