import * as fs from "node:fs";
import * as libpath from "node:path";
import { Logger } from "../../logger.js";
interface Callback<T> {
    ok: () => T;
    fail: (err: Error) => T;
}
export function mkdir<R = any>(plog: Logger, path: string, cb: Callback<R>): Promise<R> {
    const log = plog.sub("mkdir");
    const path_abs = libpath.resolve(path);
    log.variable("path", path);
    log.variable("path_abs", path_abs);
    return new Promise((resolve, reject) => {
        function safe(exp: () => R) {
            try {
                resolve(exp());
            } catch (err) {
                log.error(err);
                reject(err);
            }
        }
        fs.mkdir(
            path_abs,
            {
                recursive: true
            },
            (err) => {
                if (err) {
                    log.error(err);
                    safe(() => cb.fail(err));
                } else {
                    log.ok();
                    safe(() => cb.ok());
                }
            }
        );
    });
}
