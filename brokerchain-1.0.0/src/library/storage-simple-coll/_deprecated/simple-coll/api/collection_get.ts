import { Logger } from "../../../../../myutils/logger.js";
import { IdItem } from "../type/index.js";
import * as queue from "../queue/index.js";
export async function collection_get<T extends IdItem, R>(
    plog: Logger,
    opt: {
        namespace: string;
        key: string;
        filter?: (item: T) => boolean;
        sort?: (a: T, b: T) => number;
    },
    cb: {
        empty: () => R;
        ok: (items: T[]) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("simple-coll").sub("collection_get");
    const { namespace, key, filter, sort } = opt;
    log.variable("namespace", namespace);
    log.variable("key", key);
    return await queue.queue_collection_load(
        log,
        { namespace, key },
        {
            ok: (coll) => {
                if (!coll.items.length) {
                    return cb.empty();
                } else {
                    const filterd_items = filter ? coll.items.filter(filter) : coll.items;
                    if (!filterd_items.length) {
                        return cb.empty();
                    }
                    const sorted_items = sort ? filterd_items.sort(sort) : filterd_items;
                    return cb.ok(sorted_items);
                }
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
