// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { collection_ls } from "../_deprecated/simple-coll/disk/collection_ls.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return await collection_ls(log, {
        ok: (data) => {
            return cb.ok({ list: data });
        },
        fail: (err) => {
            return cb.fail(err);
        }
    });
}
