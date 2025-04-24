// initialized by dev/system
import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const ecdh = crypto.createECDH(input.curve_name);
    ecdh.setPrivateKey(input.my_private_key_hex, "hex");
    const secret = ecdh.computeSecret(input.target_public_key_hex, "hex");
    const output: Output = {
        secret: {
            hex: secret.toString("hex"),
            base64: secret.toString("base64")
        }
    };
    return cb.ok(output);
}
