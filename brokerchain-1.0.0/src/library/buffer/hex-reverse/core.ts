// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return buffer_from(log, input.hex, "hex", {
        empty: () => {
            return cb.ok({ hex_reversed: "" });
        },
        ok: (buff) => {
            return cb.ok({ hex_reversed: buff.reverse().toString("hex") });
        },
        fail: (err) => {
            throw err;
        }
    });
}
