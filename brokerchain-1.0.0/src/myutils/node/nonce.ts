import * as crypto from "node:crypto";
export function nonce(n = 32): string {
    // length of hex string === n * 2
    const str = crypto.randomBytes(n).toString("hex");
    return str.slice(0, n);
}
