// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { list_file, list_dir } from "../../../myutils/node/file/index.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(
    log: Logger,
    input: Input & {
        filter?: (item: { name: string; fullname: string }) => boolean;
    },
    cb: Callback<R>
): Promise<R> {
    const output: Output = {
        file_list: []
    };

    const run = async (dir: string) => {
        await list_file(log, dir, {
            empty: async () => {
                // ignore
            },
            ok: async (list) => {
                list.forEach((item) => {
                    output.file_list.push({
                        name: item.name,
                        fullname: item.fullname
                    });
                });
            },
            fail: async (err) => {
                throw err;
            }
        });

        if (!input.recursive) return;

        await list_dir(
            log,
            {
                dir
            },
            {
                empty: async () => {
                    // ignore
                },
                ok: async (list) => {
                    for (const item of list) {
                        await run(item.fullname);
                    }
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    };

    await run(input.dir);

    if (input.filter) {
        output.file_list = output.file_list.filter(input.filter);
    }

    if (output.file_list.length) {
        return cb.ok(output);
    } else {
        return cb.empty({ file_list: [] });
    }
}
