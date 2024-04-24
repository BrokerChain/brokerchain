// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.cipher-hex");
    log.variable("input", input);
    try {
        const key_bytes = buffer_from(log, input.key_hex, "hex", {
            empty: (v) => v,
            ok: (v) => v,
            fail: (err) => {
                throw err;
            }
        });
        log.variable("key_bytes", key_bytes);
        const iv_bytes = buffer_from(log, input.iv_hex, "hex", {
            empty: (v) => v,
            ok: (v) => v,
            fail: (err) => {
                throw err;
            }
        });
        log.variable("iv_bytes", iv_bytes);
        const cipher = crypto.createCipheriv(input.algorithm, key_bytes, iv_bytes);
        cipher.update(
            buffer_from(log, input.plain_content_hex, "hex", {
                empty: (v) => v,
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            })
        );
        const ciphered_content = cipher.final();
        const output: Output = {
            ciphered_content_hex: ciphered_content.toString("hex")
        };
        log.variable("output", output);
        return cb.ok(output);
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
