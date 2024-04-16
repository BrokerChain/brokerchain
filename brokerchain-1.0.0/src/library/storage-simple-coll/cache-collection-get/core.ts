// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback, copy_output } from "./type.js";
import { cache_obj } from "../_cache/index.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.cache-collection-get");
    log.variable("input", input);
    const { namespace, key } = input;
    const v = cache_obj[namespace] && cache_obj[namespace][key];
    if (v) {
        log.ok();
        // FIXME copy all the items is too heavy
        // and invoker want to update the data directlly
        // return cb.ok(copy_output(v));
        return cb.ok(v);
    } else {
        log.println("none");
        return cb.none();
    }
}
