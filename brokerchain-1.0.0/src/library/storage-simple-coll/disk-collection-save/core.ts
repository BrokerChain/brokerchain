// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { collection_save } from "../_deprecated/simple-coll/disk/collection_save.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.disk-collection-save");
    log.variable("input", input);
    return await collection_save(log, input, {
        ok: () => {
            return cb.ok({});
        },
        fail: (err) => {
            return cb.fail(err);
        }
    });
}
