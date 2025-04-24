// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { hash_hex } from "../hash-hex/export.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return await hash_hex(
        log,
        {
            algorithm: "blake2s256",
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
