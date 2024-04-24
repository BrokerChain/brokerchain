// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.convert-utf8-to-hex");
    log.variable("input", input);
    try {
        return cb.ok({
            hex: buffer_from(log, input.utf8, "utf-8", {
                empty: (v) => v,
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            }).toString("hex")
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
