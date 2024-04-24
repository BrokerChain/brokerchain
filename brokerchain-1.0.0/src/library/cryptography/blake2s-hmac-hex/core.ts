// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { hmac_hex } from "../hmac-hex/export.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.blake2s-hmac-hex");
    log.variable("input", input);
    return await hmac_hex(
        log,
        {
            algorithm: "blake2s256",
            key_hex: input.key_hex,
            content_hex: input.content_hex
        },
        {
            ok: ({ result_hex }) => {
                return cb.ok({ result_hex });
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
