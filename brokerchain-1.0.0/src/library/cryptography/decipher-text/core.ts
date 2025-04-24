// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { decipher_hex } from "../decipher-hex/export.js";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const plain_content_hex = await decipher_hex(
        log,
        {
            algorithm: input.algorithm,
            key_hex: input.key_hex,
            iv_hex: input.iv_hex,
            ciphered_content_hex: input.ciphered_text_hex
        },
        {
            ok: ({ plain_content_hex }) => {
                return plain_content_hex;
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    return cb.ok({
        plain_text: buffer_from(log, plain_content_hex, "hex", {
            empty: (v) => v,
            ok: (v) => v,
            fail: (err) => {
                throw err;
            }
        }).toString("utf-8")
    });
}
