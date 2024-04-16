// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { collection_item_del } from "../_deprecated/simple-coll/disk/collection_item_del.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.disk-collection-item-del");
    log.variable("input", input);
    return await collection_item_del(
        log,
        {
            namespace: input.namespace,
            key: input.key,
            item_id: input.item_id
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
