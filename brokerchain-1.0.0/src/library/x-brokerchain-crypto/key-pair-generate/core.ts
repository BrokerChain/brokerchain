// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { ecdh_x25519_key_pair_generate } from "../../cryptography/export.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("x-brokerchain-crypto.key-pair-generate");
    log.variable("input", input);
    try {
        const { private_key, public_key } = await ecdh_x25519_key_pair_generate(
            log,
            {},
            {
                ok: (output) => {
                    return output;
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        return cb.ok({
            private_key: private_key.hex,
            public_key: public_key.hex
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
