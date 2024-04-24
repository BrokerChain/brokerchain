// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import nacl from "tweetnacl";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.ecdh-x25519-secret-compute");
    log.variable("input", input);
    try {
        const my_private_key = buffer_from(log, input.my_private_key_hex, "hex", {
            empty: (v) => v,
            ok: (v) => v,
            fail: (err) => {
                throw err;
            }
        });
        const target_public_key = buffer_from(log, input.target_public_key_hex, "hex", {
            empty: (v) => v,
            ok: (v) => v,
            fail: (err) => {
                throw err;
            }
        });
        const secret_uin8array = nacl.box.before(new Uint8Array(target_public_key), new Uint8Array(my_private_key));
        const secret = Buffer.from(secret_uin8array); // safe to use Buffer.from here
        return cb.ok({
            secret: {
                hex: secret.toString("hex"),
                base64: secret.toString("base64")
            }
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
