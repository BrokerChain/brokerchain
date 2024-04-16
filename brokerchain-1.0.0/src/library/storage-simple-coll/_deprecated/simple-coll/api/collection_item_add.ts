import { Logger } from "../../../../../myutils/logger.js";
import { Collection, IdItem } from "../type/index.js";
import * as cache from "../cache/index.js";
import * as disk from "../disk/index.js";
export async function collection_item_add<T extends IdItem, R>(
    plog: Logger,
    opt: {
        namespace: string;
        key: string;
        item: T;
    },
    cb: {
        ok: () => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("simple-coll").sub("collection_item_add");
    const { namespace, key, item } = opt;
    log.variable("namespace", namespace);
    log.variable("key", key);
    log.variable_debug("item", item);
    // add into cache first
    let coll = cache.get(
        log,
        { namespace, key },
        {
            ok: (coll) => {
                return coll;
            },
            not_found: () => {
                log.println("collection not found, create a empty one");
                // not found, create a empty collection
                const new_coll: Collection<any> = {
                    namespace,
                    key,
                    metadata: {},
                    items: []
                };
                cache.set(log, { namespace, key }, new_coll);
                return new_coll;
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
    log.println("add into cache ok");
    // write to disk
    const result = await disk.collection_item_add(log, opt, {
        ok: () => {
            return cb.ok();
        },
        fail: (err) => {
            return cb.fail(err);
        }
    });
    return result;
}
