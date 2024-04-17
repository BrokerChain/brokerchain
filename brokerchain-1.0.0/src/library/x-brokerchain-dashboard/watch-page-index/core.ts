// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";
import * as dir from "../../../myutils/node/dir/index.js";
import { Input, Output, Callback } from "./type.js";
import { write_text_file } from "../../../myutils/node/file/index.js";
import { make_page_index } from "../make-page-index/export.js";
import * as vite from "../../vite/export.js";
import * as path from "node:path";
import { _start } from "../_server/_start.js";
import { classic } from "../../../myutils/node/classic.js";
const { __dirname } = classic(import.meta.url);

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("x-brokerchain-dashboard.watch-page-index");
    log.variable("input", input);

    try {
        const { html } = await make_page_index(
            log,
            {
                watch_mode: true
            },
            {
                ok: (output) => {
                    return output;
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        await write_text_file(log, path.resolve(__dirname, "../_webroot-src/index/index.html"), html, {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        });

        // FIXME two servers is started for now:
        // 1. the real server (_start) which handles the API request
        // 2. the vite server which handles the page update

        _start(log, {
            host: "127.0.0.1", // local access only
            http_port: 5000, // the vite will proxy POST /library/... request to here
            https_port: 8443 // actually not used...
        });

        await vite.watch(
            log,
            {
                root_dir: dir.root,
                entry_html_list: [
                    {
                        name: "index",
                        path: path.resolve(__dirname, "../_webroot-src/index/index.html")
                    }
                ],
                proxy_list: [
                    {
                        source_path: "/library",
                        target_server: "http://127.0.0.1:5000",
                        change_origin: true
                    }
                ],

                tailwindcss: {
                    config: path.resolve(__dirname, "../_page-index/_tailwind/tailwind.config.js")
                },

                port: 3000
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
        return cb.ok({});
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
