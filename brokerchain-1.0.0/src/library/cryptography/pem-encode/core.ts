// initialized by dev/system
import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return cb.fail(log.new_error("TODO"));
}
