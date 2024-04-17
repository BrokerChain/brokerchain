// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("x-brokerchain-website.watch");
    log.variable("input", input);
    return cb.fail(log.new_error("TODO"));
}
