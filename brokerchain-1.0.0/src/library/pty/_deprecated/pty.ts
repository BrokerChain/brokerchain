import { Logger } from "../../../myutils/logger.js";
import * as os from "node:os";
import * as node_pty from "node-pty";
interface Options {
    file: string;
    args: string[];
    input: string[];
    cwd?: string;
}
interface Callback<R> {
    ok: (exit_code: number) => R;
    fail: (err: Error) => R;
}
export async function pty<R>(plog: Logger, opts: Options, cb: Callback<R>): Promise<R> {
    const log = plog.sub("command.pty");
    const { file, args, input, cwd } = opts;
    log.variable("file", file);
    log.variable("args", args);
    log.variable("input", input);
    log.variable("cwd", cwd);
    return new Promise<R>((resolve, reject) => {
        const pty_proc = node_pty.spawn(file, args, {
            cols: process.stdout.columns || 80,
            rows: process.stdout.rows || 30,
            cwd: cwd || process.cwd(),
            env: process.env
        });
        log.variable("pid", pty_proc.pid);
        process.stdin.on("data", (data) => {
            pty_proc.write(data.toString());
        });
        pty_proc.onData((data) => {
            // process.stdout.write(data);
            // log.println(data);
            log.println(data.length);
        });
        input.forEach((line) => {
            pty_proc.write(`${line}\n`); // auto append line end
        });
        pty_proc.onExit(({ exitCode: exit_code }) => {
            log.variable("exit_code", exit_code);
            resolve(cb.ok(exit_code));
        });
    });
}
