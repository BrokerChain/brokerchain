// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { cache_obj } from "../_cache/index.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    // online system can be very slow when not disabled
    log.enable(false);
    log.warn("log disabled for performance reason, if you want to check the data here, you can edit the code here to enable");
    //

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
