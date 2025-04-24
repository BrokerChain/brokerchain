// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { collection_item_add } from "../_deprecated/simple-coll/disk/collection_item_add.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return await collection_item_add(
        log,
        {
            namespace: input.namespace,
            key: input.key,
            item: input.item
        },
        {
            ok: () => {
                return cb.ok({});
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
