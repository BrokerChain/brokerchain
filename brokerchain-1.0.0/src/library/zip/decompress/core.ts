// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { add_exe_on_windows } from "../../../myutils/node/add_exe_on_windows.js";
import { Input, Output, Callback } from "./type.js";
import { run } from "../../pty/export.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return await run(
        log,
        {
            file: add_exe_on_windows(log, "unzip"),
            args: ["-d", input.to_path, input.from_file]
        },
        {
            ok: ({ exit_code }) => {
                if (exit_code !== 0) {
                    throw log.new_error("exit with code " + exit_code);
                }
                return cb.ok({});
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
