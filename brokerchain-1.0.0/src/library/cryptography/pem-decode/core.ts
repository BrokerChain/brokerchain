// initialized by dev/system
import { Logger } from "../../../myutils/logger.js";
import { forge } from "../../node-forge/_/index.js";
import { Input, Output, Callback } from "./type.js";
import { buffer_from } from "../_/buffer_from.js";

// [DEBUG tips]
//
// display .pem file with openssl:
//   openssl rsa -in <file> -noout -text
//
// display x509 file with openssl:
//   openssl x509 -in <file> -noout -text
export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.pem-decode");
    log.variable("input", input);
    try {
        const list = forge.pem.decode(input.text);
        log.variable("list", list);
        return cb.ok({
            list: list.map((item) => {
                return {
                    type: item.type,
                    content: buffer_from(log, item.body, "utf-8", {
                        empty: (v) => v,
                        ok: (v) => v,
                        fail: (err) => {
                            throw err;
                        }
                    }).toString("hex")
                };
            })
        });
    } catch (err) {
        return cb.fail(err);
    }
}
