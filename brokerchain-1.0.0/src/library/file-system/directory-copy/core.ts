// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as path from "node:path";
import { file_ls } from "../file-ls/export.js";
import { file_copy } from "../file-copy/export.js";
import { directory_create } from "../directory-create/export.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const from_dir_abs = path.resolve(input.from);
    const to_dir_abs = path.resolve(input.to);

    log.variable("from_dir_abs", from_dir_abs);
    log.variable("to_dir_abs", to_dir_abs);

    // create the parent directory first
    // this is useful when from dir is empty, the to dir will still be created
    // that's correct

    const to_dir_parent_abs = path.dirname(to_dir_abs);
    log.variable("to_dir_parent_abs", to_dir_parent_abs);

    await directory_create(
        log,
        {
            name: to_dir_parent_abs
        },
        {
            skip: () => {
                // ignore
            },
            ok: (output) => {
                return output;
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    // ok, copy all the files now
    // it can be empty list, it's ok

    const { file_list } = await file_ls(
        log,
        {
            dir: from_dir_abs,
            recursive: true
        },
        {
            empty: (output) => {
                return output;
            },
            ok: (output) => {
                return output;
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    const file_list_relative = file_list.map((item) => {
        return {
            name: item.name,
            fullname: item.fullname,
            relative_name: path.relative(from_dir_abs, item.fullname)
        };
    });
    log.variable("file_list_relative", file_list_relative);

    for (const item of file_list_relative) {
        await file_copy(
            log,
            {
                from: item.fullname,
                to: path.resolve(to_dir_abs, item.relative_name)
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
    }

    return cb.ok({});
}
