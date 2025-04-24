// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return buffer_from(log, input.base64, "base64", {
        empty: () => {
            return cb.ok({ hex: "" });
        },
        ok: (buff) => {
            return cb.ok({ hex: buff.toString("hex") });
        },
        fail: (err) => {
            throw err;
        }
    });
}
