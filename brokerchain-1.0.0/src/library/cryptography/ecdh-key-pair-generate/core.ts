// initialized by dev/system
import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";
export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.ecdh-key-pair-generate");
    log.variable("input", input);
    try {
        var ecdh = crypto.createECDH(input.curve_name);
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
    ecdh.generateKeys();
    const output: Output = {
        private_key: {
            hex: ecdh.getPrivateKey("hex"),
            base64: ecdh.getPrivateKey("base64")
        },
        public_key: {
            hex: ecdh.getPublicKey("hex"),
            base64_uncompressed: ecdh.getPublicKey("base64", "uncompressed"),
            base64_compressed: ecdh.getPublicKey("base64", "compressed"),
            base64_hybrid: ecdh.getPublicKey("base64", "hybrid")
        }
    };
    log.variable("output", output);
    return cb.ok(output);
}
