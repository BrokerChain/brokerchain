// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { hex_slice } from "../_/hex_slice.js";

export function core<R>(log: Logger, input: Input, cb: Callback<R>): R {
    return hex_slice(log, input, {
        empty: (v) => {
            return cb.empty({ sliced_hex: "" });
        },
        ok: (v) => {
            return cb.ok({ sliced_hex: v.toString("hex") });
        },
        fail: (err) => {
            throw err;
        }
    });
}
