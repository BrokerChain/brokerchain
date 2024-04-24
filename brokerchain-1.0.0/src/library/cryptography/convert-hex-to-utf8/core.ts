// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.convert-hex-to-utf8");
    log.variable("input", input);
    try {
        return cb.ok({
            utf8: buffer_from(log, input.hex, "hex", {
                empty: (v) => v,
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            }).toString("utf-8")
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
