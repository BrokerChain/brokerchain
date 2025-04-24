// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    try {
        throw log.new_error("TODO");
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
