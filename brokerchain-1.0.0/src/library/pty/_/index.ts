import { Logger } from "../../../myutils/logger.js";
import { guid } from "../../../myutils/common/guid.js";
import * as pty from "node-pty";

export function pty_spawn<R>(
    plog: Logger,
    opt: {
        pty_name?: string;
        file: string;
        args?: string[];
        cwd?: string;
        env?: NodeJS.ProcessEnv;
        run?: (instance: pty.IPty) => void;
    },
    cb: {
        ok: (output: { exit_code: number; signal?: number }) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    return new Promise((resolve, reject) => {
        const log = plog.sub("pty_spawn");
        log.variable("opt", opt);
        const pty_opt: pty.IPtyForkOptions | pty.IWindowsPtyForkOptions = {
            name: opt.pty_name || `pty-${guid()}`,
            cols: process.stdout.columns,
            rows: process.stdout.rows,
            cwd: opt.cwd || process.cwd(),
            env: opt.env || process.env,
            // must set this option to false to handle the windows exit problem:
            // https://github.com/microsoft/node-pty/issues/437
            useConpty: false
        };
        // log.variable("pty_opt", pty_opt);

        // FIXME this fix maybe changed later
        // fix the file name without ".exe" postfix on windows platform

        let file = opt.file;
        let args = opt.args || [];
        const pty_proc = pty.spawn(file, args, pty_opt);

        let is_pty_proc_exited = false;

        process.stdin.setEncoding("utf8");
        try {
            var originalRawModeValue = process.stdin.isRaw;
            // Throw error when:
            // Running in a non-interactive environment
            process.stdin.setRawMode(true);
            log.println("set stdin raw mode: true");
        } catch (err) {
            log.warn(err);
        }
        process.stdout.setDefaultEncoding("utf8");

        // this is not required on mac, but maybe required on windows
        process.once("exit", () => {
            if (!is_pty_proc_exited) {
                log.println("current process is exiting, kill the pty child process");
                pty_proc.kill();
            }
        });

        process.stdout.on("resize", () => {
            if (!is_pty_proc_exited) {
                // log.println(`current process is resized, resize the pty child process too: ${process.stdout.columns}x${process.stdout.rows}`);
                pty_proc.resize(process.stdout.columns, process.stdout.rows);
            }
        });

        process.stdin.on("data", (data) => {
            // log.println("forward current process data to pty child process");
            if (!is_pty_proc_exited) {
                pty_proc.write(data.toString());
            }
        });

        pty_proc.onData((data) => {
            // log.println("forward pty child process data to current process");
            process.stdout.write(data);
        });

        pty_proc.onExit((exit) => {
            log.println("pty process exit");
            is_pty_proc_exited = true;
            log.variable("exit", exit);
            process.stdin.unref(); // IMPORTANT, or the process will hang
            restore_raw_mode_value();
            try {
                resolve(cb.ok({ exit_code: exit.exitCode, signal: exit.signal }));
            } catch (err) {
                reject(err);
            }
        });

        if (opt.run) {
            opt.run(pty_proc);
        }

        function restore_raw_mode_value() {
            try {
                // Throw error when:
                // Running in a non-interactive environment
                process.stdin.setRawMode(originalRawModeValue);
                log.println(`set stdin raw mode: ${originalRawModeValue}`);
            } catch (err) {
                log.warn(err);
            }
        }
    });
}
