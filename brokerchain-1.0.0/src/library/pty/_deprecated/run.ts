import * as cp from "node:child_process";
import { Logger } from "../../../myutils/logger.js";
interface Options {
    file: string;
    args: string[];
}
interface Callback<R> {
    ok: (stdout: string, stderr: string) => R;
    fail: (err: Error) => R;
}
export async function run<R>(plog: Logger, opts: Options, cb: Callback<R>): Promise<R> {
    const log = plog.sub("command.run");
    const { file, args } = opts;
    log.variable("args", args);
    return new Promise<R>((resolve, reject) => {
        cp.execFile(
            file,
            args,
            {
                maxBuffer: 10 * 1024 * 1024 // avoid ERR_CHILD_PROCESS_STDIO_MAXBUFFER
            },
            (err, stdout, stderr) => {
                // example err:
                // {
                //     "killed": false,
                //     "code": 1,
                //     "signal": null,
                //     "cmd": "youtube-dl -j https://miaodeli.com"
                // }
                log.variable("err", err);
                // log.variable("stdout", stdout);
                // log.variable("stderr", stderr);
                log.sub("stdout").println(stdout);
                log.sub("stderr").println(stderr);
                if (err) {
                    try {
                        log.error(err);
                        const result = cb.fail(err);
                        resolve(result);
                    } catch (err) {
                        log.error(err);
                        reject(err);
                    }
                    return;
                }
                try {
                    const result = cb.ok(stdout, stderr);
                    resolve(result);
                } catch (err) {
                    log.error(err);
                    reject(err);
                }
            }
        );
    });
}
