// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as os from "node:os";
import { pty_spawn } from "../_/index.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
    return await pty_spawn(
        log,
        {
            file: shell
        },
        {
            ok: () => {
                return cb.ok({});
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
