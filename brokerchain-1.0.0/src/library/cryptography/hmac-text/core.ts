// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { hmac_hex } from "../hmac-hex/export.js";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const result_hex = await hmac_hex(
        log,
        {
            algorithm: input.algorithm,
            key_hex: input.key_hex,
            content_hex: buffer_from(log, input.text, "utf-8", {
                empty: (v) => v,
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            }).toString("hex")
        },
        {
            ok: ({ result_hex }) => {
                return result_hex;
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    return cb.ok({
        result_hex
    });
}
