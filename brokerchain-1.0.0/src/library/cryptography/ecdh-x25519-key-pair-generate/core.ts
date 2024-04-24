// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import nacl from "tweetnacl";
import { buffer_from } from "../_/buffer_from.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.ecdh-x25519-key-pair-generate");
    log.variable("input", input);
    try {
        const key_pair = nacl.box.keyPair();
        const public_key = Buffer.from(key_pair.publicKey); // safe to use Buffer.from here
        const private_key = Buffer.from(key_pair.secretKey); // safe to use Buffer.from here
        return cb.ok({
            private_key: {
                hex: private_key.toString("hex"),
                base64: private_key.toString("base64")
            },
            public_key: {
                hex: public_key.toString("hex"),
                base64: public_key.toString("base64")
            }
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
