// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";
import * as dir from "../../../myutils/node/dir/index.js";
import { Input, Output, Callback } from "./type.js";
import { write_text_file, del_dir } from "../../../myutils/node/file/index.js";
import { make_page_index } from "../make-page-index/export.js";
import * as vite from "../../vite/export.js";
import * as path from "node:path";
import { classic } from "../../../myutils/node/classic.js";
const { __dirname } = classic(import.meta.url);

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("x-brokerchain-dashboard.build-page-index");
    log.variable("input", input);

    try {
        const { html } = await make_page_index(
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

        // FIXME
        // generate the html file at root directory to satisfy the vite build system
        // remove the file later
        await write_text_file(log, path.resolve(dir.root, "index/index.html"), html, {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        });

        await vite.build(
            log,
            {
                root_dir: dir.root,
                entry_html_list: [
                    {
                        name: "index",
                        path: path.resolve(dir.root, "index/index.html")
                    }
                ],

                tailwindcss: {
                    config: path.resolve(__dirname, "../_page-index/_tailwind/tailwind.config.js")
                },

                out_dir: path.resolve(__dirname, "../_webroot"),
                empty_out_dir: input.empty_out_dir
            },
            {
                ok: async () => {
                    await clean();
                },
                fail: async (err) => {
                    await clean();
                    throw err;
                }
            }
        );

        return cb.ok({});
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }

    async function clean() {
        await del_dir(log, path.resolve(dir.root, "index"), {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                // tolerate
                log.warn(err);
            }
        });
    }
}