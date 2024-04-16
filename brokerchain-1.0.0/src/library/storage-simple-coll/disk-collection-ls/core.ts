// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { collection_ls } from "../_deprecated/simple-coll/disk/collection_ls.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.disk-collection-ls");
    log.variable("input", input);

    return await collection_ls(log, {
        ok: (data) => {
            return cb.ok({ list: data });
        },
        fail: (err) => {
            return cb.fail(err);
        }
    });
}
