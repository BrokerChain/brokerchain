// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { resolve } from "../_deprecated/simple-coll/disk/dirname/resolve.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return cb.ok({
        dirname: resolve(input.namespace, input.key)
    });
}
