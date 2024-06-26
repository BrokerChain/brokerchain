// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { run } from "../run/export.js";
import { _start } from "../_server/_start.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("x-brokerchain-dashboard.run-dev");
    log.variable("input", input);
    try {
        return await run(
            log,
            {
                build: input.build,
                host: "0.0.0.0",
                http_port: 8080,
                https_port: 8443
            },
            {
                ok: (output) => {
                    return cb.ok(output);
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
