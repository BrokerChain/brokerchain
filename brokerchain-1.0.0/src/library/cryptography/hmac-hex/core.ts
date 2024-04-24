// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.hmac-hex");
    log.variable("input", input);
    try {
        const hmac = crypto.createHmac(
            input.algorithm,
            buffer_from(log, input.key_hex, "hex", {
                empty: (v) => v,
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            }),
            {
                // TODO
            }
        );

        hmac.update(
            buffer_from(log, input.content_hex, "hex", {
                empty: (v) => v,
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            })
        );
        const result = hmac.digest();

        return cb.ok({
            result_hex: result.toString("hex")
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
