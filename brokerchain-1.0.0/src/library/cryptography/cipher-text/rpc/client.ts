// auto generated by dev/system

import { Logger } from "../../../../myutils/logger.js";
import { post_json } from "../../../../myutils/common/net/index.js";
import { Input, Callback, OutputOk } from "../type.js";
import { RpcResult } from "./type.js";

export async function rpc_cipher_text<R>(plog: Logger, opts: { server: string; input: Input }, cb: Callback<R>): Promise<R> {
    const log = plog.sub("rpc_cipher_text");

    try {
        const { server, input } = opts;

        const server_url = new URL(server);
        const prefix = `${server_url.protocol}//${server_url.host}`;
        log.variable("prefix", prefix);

        return await post_json(
            log,
            {
                url: `${prefix}/library/cryptography/cipher-text`,
                data: input
            },
            {
                ok: (rpc_result: RpcResult) => {
                    log.variable("rpc_result", rpc_result);

                    // TODO check the rpc_result

                    if (rpc_result.ok) {
                        log.println("ok");
                        const output: OutputOk = rpc_result.ok;
                        log.variable("output", output);
                        return cb.ok(output);
                    }

                    if (rpc_result.fail) {
                        const err = log.new_error(rpc_result.fail.message);
                        return cb.fail(err);
                    }

                    throw log.new_error("unexpected server response");
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    } catch (err) {
        return cb.fail(err);
    }
}
