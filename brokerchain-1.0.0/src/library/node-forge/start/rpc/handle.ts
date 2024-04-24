// auto generated by dev/system

import { Logger } from "../../../../myutils/logger.js";
import { core } from "../core.js";
import { Input, check_input, OutputOk } from "../type.js";
import { RpcResult } from "./type.js";

interface Callback<R> {
    invalid_input: (err: Error) => R;
    ok: (result: RpcResult) => R; // include normal fail case
    fail: (err: Error) => R; // unexpected case
}

export async function handle_rpc_start<R>(plog: Logger, input: any, cb: Callback<R>): Promise<R> {
    const log = plog.sub("handle_rpc_start");

    try {
        return await check_input(log, input, {
            ok: async () => {
                const result = await core<RpcResult>(log, input, {
                    ok: (output) => {
                        return { ok: output };
                    },
                    fail: (err) => {
                        return {
                            fail: {
                                message: err.message
                            }
                        };
                    }
                });

                // TODO check result

                return cb.ok(result);
            },
            fail: async (err) => {
                return cb.invalid_input(err);
            }
        });
    } catch (err) {
        return cb.fail(err);
    }
}
