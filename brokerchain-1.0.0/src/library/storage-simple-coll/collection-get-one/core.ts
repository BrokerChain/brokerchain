// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { collection_get } from "../collection-get/export.js";
import { Item } from "../_type/index.js";

export async function core<R>(
    log: Logger,
    input: Input & {
        // FIXME this field is not optional
        match?: (item: Item) => boolean;
    },
    cb: Callback<R>
): Promise<R> {
    const { namespace, key, match } = input;

    if (!match) {
        return cb.none();
    }

    return collection_get(
        log,
        {
            namespace,
            key,
            filter: (item: Item) => match(item)
        },
        {
            empty: () => {
                return cb.none();
            },
            ok: ({ items }) => {
                return cb.ok(items[0]);
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
