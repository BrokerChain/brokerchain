// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { cache_obj } from "../_cache/index.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.cache-collection-set");
    log.variable("input", input);
    const { namespace, key } = input;
    if (!cache_obj[namespace]) {
        cache_obj[namespace] = {
            [key]: input
        };
    } else {
        cache_obj[namespace][key] = input;
    }
    return cb.ok({});
}
