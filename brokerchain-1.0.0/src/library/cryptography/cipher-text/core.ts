// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { cipher_hex } from "../cipher-hex/export.js";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const ciphered_content_hex = await cipher_hex(
        log,
        {
            algorithm: input.algorithm,
            key_hex: input.key_hex,
            iv_hex: input.iv_hex,
            plain_content_hex: buffer_from(log, input.plain_text, "utf-8", {
                empty: (v) => v,
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            }).toString("hex")
        },
        {
            ok: ({ ciphered_content_hex }) => {
                return ciphered_content_hex;
            },
            fail: (err) => {
                throw err;
            }
        }
    );
    return cb.ok({ ciphered_text_hex: ciphered_content_hex });
}
