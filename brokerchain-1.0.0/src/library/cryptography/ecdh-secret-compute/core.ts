// initialized by dev/system
import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";
export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.ecdh-secret-compute");
    log.variable("input", input);
    try {
        var ecdh = crypto.createECDH(input.curve_name);
        ecdh.setPrivateKey(input.my_private_key_hex, "hex");
        const secret = ecdh.computeSecret(input.target_public_key_hex, "hex");
        const output: Output = {
            secret: {
                hex: secret.toString("hex"),
                base64: secret.toString("base64")
            }
        };
        log.variable("output", output);
        return cb.ok(output);
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
}
