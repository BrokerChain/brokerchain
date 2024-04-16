// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { disk_collection_load } from "../disk-collection-load/export.js";
import { cache_collection_get } from "../cache-collection-get/export.js";
import { cache_collection_set } from "../cache-collection-set/export.js";
import { queue_add } from "../_queue/index.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.queue-collection-load");
    log.variable("input", input);
    const { namespace, key } = input;
    // NOTE handle exception carefully
    try {
        // [dangerous] Dining Philosophers problem
        // don't invoke cb.xxx() in queue_add()
        // or serous bugs happen that never return and task never return
        const coll = await queue_add(log, async () => {
            // check from cache first
            const cached_coll = await cache_collection_get(
                log,
                { namespace, key },
                {
                    none: () => {
                        return null;
                    },
                    ok: (coll) => {
                        return coll;
                    },
                    fail: (err) => {
                        throw err;
                    }
                }
            );

            // cache hit, ok
            if (cached_coll) {
                // return cb.ok(cached_coll); // don't do this
                return cached_coll;
            }

            // cache miss
            const loaded_coll = await disk_collection_load(log, input, {
                ok: (coll) => {
                    return coll;
                },
                fail: (err) => {
                    throw err;
                }
            });

            await cache_collection_set(log, loaded_coll, {
                ok: () => {
                    // ignore
                },
                fail: (err) => {
                    throw err;
                }
            });

            // return cb.ok(loaded_coll); // don't do this
            return loaded_coll;
        });

        return cb.ok(coll);
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
