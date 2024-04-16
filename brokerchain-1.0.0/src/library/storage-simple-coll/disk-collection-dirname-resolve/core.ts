// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { resolve } from "../_deprecated/simple-coll/disk/dirname/resolve.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.disk-collection-dirname-resolve");
    log.variable("input", input);
    return cb.ok({
        dirname: resolve(input.namespace, input.key)
    });
}
