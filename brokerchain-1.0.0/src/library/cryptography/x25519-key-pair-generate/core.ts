// initialized by dev/system
import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return new Promise((resolve, reject) => {
        function safe(exp: () => R) {
            try {
                const ret = exp();
                resolve(ret);
            } catch (err) {
                log.error(err);
                reject(err);
            }
        }
        crypto.generateKeyPair(
            "x25519",
            {
                publicKeyEncoding: {
                    type: "spki",
                    format: "pem"
                },
                privateKeyEncoding: {
                    type: "pkcs8",
                    format: "pem"
                }
            },
            (err, publick_key, private_key) => {
                if (err) {
                    safe(() => cb.fail(err));
                    return;
                } else {
                    const output: Output = {
                        private_key: {
                            pem: private_key
                        },
                        public_key: {
                            pem: publick_key
                        }
                    };
                    safe(() => cb.ok(output));
                }
            }
        );
    });
}
