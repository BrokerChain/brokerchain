// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { queue_collection_load } from "../queue-collection-load/export.js";
import { Item } from "../_type/index.js";

export async function core<R>(
    plog: Logger,
    input: Input & {
        filter?: (item: Item) => boolean;
        sort?: (a: Item, b: Item) => number;
    },
    cb: Callback<R>
): Promise<R> {
    const log = plog.sub("storage-simple-coll.collection-get");
    log.variable("input", input);
    const { namespace, key, filter, sort } = input;
    return await queue_collection_load(
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
                    return cb.ok({ items: sorted_items });
                }
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
