import { Logger } from "../../../../../myutils/logger.js";
import { IdItem } from "../type/index.js";
import * as cache from "../cache/index.js";
import * as disk from "../disk/index.js";
export async function collection_item_del<R>(
    plog: Logger,
    opt: {
        namespace: string;
        key: string;
        item_id: string;
    },
    cb: {
        none: () => R;
        ok: (item: IdItem) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("simple-coll").sub("collection_item_del");
    const { namespace, key, item_id } = opt;
    log.variable("namespace", namespace);
    log.variable("key", key);
    log.variable_debug("item_id", item_id);
    // [STEPS]
    // 1. remove from cache
    // 2. remove from disk
    // [NOTE]
    // 1. it is possible there isn't item in cache.
    //    cause command line tool usually won't load all items into memory and build cache.
    //    cache is built in server environment only.
    // 2. this function returns the target item after deletion.
    //    so there is a disk reading operation before removing.
    let target: IdItem | null = null;
    cache.get(
        log,
        {
            namespace,
            key
        },
        {
            ok: (coll) => {
                // remove from cache
                coll.items = coll.items.filter((item) => {
                    let match = item.id === item_id;
                    if (match) target = item;
                    return !match;
                });
                // cache loaded but not found in cache? report an warning
                log.warn("cache loaded but not found in cache?");
            },
            not_found: () => {
                // ignore
                log.println("cache not found, ignore");
            }
        }
    );
    // item data not exits in cache
    // have to load it from disk
    if (!target) {
        return await disk.collection_item_get(
            log,
            {
                namespace,
                key,
                id: item_id
            },
            {
                ok: async (data) => {
                    target = data;
                    // write to disk
                    return await disk.collection_item_del(log, opt, {
                        ok: () => {
                            return cb.ok(target);
                        },
                        fail: (err) => {
                            return cb.fail(err);
                        }
                    });
                },
                fail: async (err) => {
                    // FIXME
                    // item not found in cache & not found on disk (or load fail)
                    // report none here
                    return cb.none();
                }
            }
        );
    } else {
        // write to disk
        return await disk.collection_item_del(log, opt, {
            ok: () => {
                return cb.ok(target);
            },
            fail: (err) => {
                return cb.fail(err);
            }
        });
    }
}
