// initialized by dev/system
import { Logger } from "../../../myutils/logger.js";
import { forge } from "../../node-forge/_/index.js";
import { Input, Output, Callback } from "./type.js";
export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.rsa-key-pair-generate");
    log.variable("input", input);
    const bits = input.bits === undefined ? 2048 : input.bits;
    log.variable("bits", bits);
    const pair = forge.pki.rsa.generateKeyPair(bits);
    const pem_private_key = forge.pki.privateKeyToPem(pair.privateKey);
    const pem_public_key = forge.pki.publicKeyToPem(pair.publicKey);
    // easier to copy
    // console.log("private key:");
    // console.log(pem_private_key);
    // console.log("");
    // console.log("public key:");
    // console.log(pem_public_key);
    // console.log("");
    return cb.ok({
        pem_private_key,
        pem_public_key
    });
}
