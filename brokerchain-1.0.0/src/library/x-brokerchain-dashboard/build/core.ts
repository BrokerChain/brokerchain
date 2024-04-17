import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { build_page_index } from "../build-page-index/export.js";
import { classic } from "../../../myutils/node/classic.js";
import * as path from "node:path";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("x-brokerchain-dashboard.build");
    log.variable("input", input);
    try {
        await build_page_index(
            log,
            {
                empty_out_dir: false // important
            },
            {
                ok: () => {
                    // ignore
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        const { __dirname } = classic(import.meta.url);
        const webroot = path.resolve(__dirname, "../_webroot");
        log.variable("webroot", webroot);

        return cb.ok({
            webroot
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
