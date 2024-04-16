import { Logger } from "../logger.js";
import * as cp from "node:child_process";
import { dirname } from "node:path";
// FIXME: not working on windows!
export function run_bash_script<R>(
    plog: Logger,
    opt: {
        filename: string;
        detached?: boolean;
        env?: NodeJS.ProcessEnv;
    },
    cb: {
        // command executed and exit code === 0
        code_ok: (result: { stdout: string; stderr: string; code: number }) => R;
        // command executed and exit code !== 0
        code_not_ok: (result: { stdout: string; stderr: string; code: number }) => R;
        // command not started, eg. bash is not available on windows
        fail: (err: Error) => R;
    }
) {
    const log = plog.sub("run_bash_script");
    const { filename } = opt;
    log.variable("filename", filename);
    const cwd = dirname(filename);
    log.variable("cwd", cwd);
    return new Promise((resolve, reject) => {
        function safe(exp: () => R) {
            try {
                resolve(exp());
            } catch (err) {
                log.error(err);
                reject(err);
            }
        }
        log.println("begin");
        const p = cp.spawn("/bin/sh", [filename], {
            cwd,
            detached: opt.detached,
            env: opt.env
        });
        let code = 0;
        const stdout_chunks: Buffer[] = [];
        const stderr_chunks: Buffer[] = [];
        p.stdout.on("data", (chunk) => {
            stdout_chunks.push(chunk);
        });
        p.stderr.on("data", (chunk) => {
            stderr_chunks.push(chunk);
        });
        p.once("exit", (_code) => {
            code = _code;
            const stdout = Buffer.concat(stdout_chunks).toString("utf8");
            const stderr = Buffer.concat(stderr_chunks).toString("utf8");
            log.println("finish");
            log.variable_debug("stdout", stdout);
            log.variable_debug("stderr", stderr);
            if (code === 0) {
                safe(() => cb.code_ok({ stdout, stderr, code }));
            } else {
                safe(() => cb.code_not_ok({ stdout, stderr, code }));
            }
        });
        p.once("error", (err) => {
            log.error(err);
            safe(() => cb.fail(err));
        });
    });
}
