// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const hash = crypto.createHash(input.algorithm, {
        // TODO options
    });
    hash.update(
        buffer_from(log, input.content_hex, "hex", {
            empty: (v) => v,
            ok: (v) => v,
            fail: (err) => {
                throw err;
            }
        })
    );
    const result = hash.digest();
    return cb.ok({
        result_hex: result.toString("hex")
    });
}
