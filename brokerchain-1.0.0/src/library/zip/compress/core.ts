// initialized by dev/system

import * as path from "node:path";
import { Logger } from "../../../myutils/logger.js";
import { add_exe_on_windows } from "../../../myutils/node/add_exe_on_windows.js";
import { Input, Output, Callback } from "./type.js";
import { run } from "../../pty/export.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("zip.compress");
    log.variable("input", input);
    const from_path_abs = path.resolve(input.from_path);
    const from_path_parent_abs = path.resolve(input.from_path, "../");
    const dir_name = path.basename(from_path_abs);
    const to_file = path.resolve(input.to_file);

    if (input.without_parent_dir) {
        return await run(
            log,
            {
                file: add_exe_on_windows(log, "zip"),
                args: ["-r", to_file, "."],
                cwd: from_path_abs
            },
            {
                ok: ({ exit_code }) => {
                    if (exit_code !== 0) {
                        return cb.fail(log.new_error("exit_code=" + exit_code));
                    } else {
                        return cb.ok({});
                    }
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            }
        );
    } else {
        return await run(
            log,
            {
                file: "zip",
                args: [
                    "-r",
                    to_file,
                    dir_name // important, don't provide full path here
                ],
                cwd: from_path_parent_abs // important, must switch to the dir
            },
            {
                ok: ({ exit_code }) => {
                    if (exit_code !== 0) {
                        return cb.fail(log.new_error("exit_code=" + exit_code));
                    } else {
                        return cb.ok({});
                    }
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            }
        );
    }
}
