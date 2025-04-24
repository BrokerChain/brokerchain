// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { pty_spawn } from "../_/index.js";

// THE KNWON BUG:
// there is a unknown conflict between "node-pty" and "prompts" package
// when prompts is invoked to get any input before invoke this function, the bug happens.
// the program looks halt. you will see input stream is not working, and your keyboard seems to be not working
// but actually, output stream is ok.
// -
// the bug is hard to fix for now.
export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return await pty_spawn(
        log,
        {
            file: input.file,
            args: input.args,
            cwd: input.cwd,
            run: (pty_proc) => {
                if (input.text) {
                    pty_proc.write(input.text);
                }
            }
        },
        {
            ok: ({ exit_code }) => {
                return cb.ok({ exit_code });
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
