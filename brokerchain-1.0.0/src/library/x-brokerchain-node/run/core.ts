// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as website from "../../x-brokerchain-website/export.js";
import * as dashboard from "../../x-brokerchain-dashboard/export.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("x-brokerchain-node.run");
    log.variable("input", input);
    try {
        await website.build(
            log,
            {},
            {
                ok: () => {
                    // ignore
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        await dashboard.build(
            log,
            {},
            {
                ok: () => {
                    // ignore
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        // don't wait, run it in background

        website.run_public(
            log,
            {
                build: false
            },
            {
                ok: () => {
                    log.println("website is running");
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        // don't wait, run it in background

        dashboard.run_dev(
            log,
            {
                build: false
            },
            {
                ok: () => {
                    log.println("dashboard is running");
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        // start the core...
        // TODO

        return cb.ok({});
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
