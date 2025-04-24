// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { collection_item_get } from "../_deprecated/simple-coll/disk/collection_item_get.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return await collection_item_get(
        log,
        {
            namespace: input.namespace,
            key: input.key,
            id: input.id
        },
        {
            ok: (data) => {
                return cb.ok(data);
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
