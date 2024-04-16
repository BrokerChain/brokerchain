// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { collection_item_get } from "../_deprecated/simple-coll/disk/collection_item_get.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.disk-collection-item-get");
    log.variable("input", input);
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
