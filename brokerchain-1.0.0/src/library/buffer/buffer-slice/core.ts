// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { buffer_from } from "../_/buffer_from.js";
import { buffer_slice } from "../_/buffer_slice.js";

export function core<R>(plog: Logger, input: Input, cb: Callback<R>): R {
    const log = plog.sub("buffer.buffer-slice");
    log.variable("input", input);
    try {
        const buffer = buffer_from(log, input.hex, "hex", {
            empty: (v) => v,
            ok: (v) => v,
            fail: (err) => {
                throw err;
            }
        });

        return buffer_slice(
            log,
            {
                buffer,
                start: input.byte_start,
                end: input.byte_end
            },
            {
                empty: (v) => {
                    return cb.empty({ sliced_hex: "" });
                },
                ok: (v) => {
                    return cb.ok({ sliced_hex: v.toString("hex") });
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
