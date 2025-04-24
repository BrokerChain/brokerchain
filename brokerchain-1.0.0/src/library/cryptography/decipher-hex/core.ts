// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
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
    const decipher = crypto.createDecipheriv(input.algorithm, key_bytes, iv_bytes.length > 0 ? iv_bytes : null);
    const ciphered_content = buffer_from(log, input.ciphered_content_hex, "hex", {
        empty: (v) => v,
        ok: (v) => v,
        fail: (err) => {
            throw err;
        }
    });
    decipher.update(ciphered_content);
    const plain_content = decipher.final();
    return cb.ok({ plain_content_hex: plain_content.toString("hex") });
}
