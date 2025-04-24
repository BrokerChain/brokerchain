// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as website from "../../x-brokerchain-website/export.js";
import * as dashboard from "../../x-brokerchain-dashboard/export.js";
import * as crypto from "../../x-brokerchain-crypto/export.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
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

        // generate key pari
        const { private_key, public_key } = await crypto.key_pair_generate(
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

        // TODO

        return cb.ok({});
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
