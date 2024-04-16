import { Logger } from "../../logger.js";
import * as path from "node:path";
import * as fs from "node:fs";
interface Callback<T> {
    ok: () => T;
    fail: (error: Error) => T;
}
export function del_dir<R>(plog: Logger, name: string, cb: Callback<R>): Promise<R> {
    const log = plog.sub("del_dir");
    log.variable("name", name);
    return new Promise((resolve, reject) => {
        function safe(exp: () => R) {
            try {
                resolve(exp());
            } catch (err) {
                log.error(err);
                reject(err);
            }
        }
        fs.rm(name, { recursive: true, force: true }, (err) => {
            if (err) {
                log.error(err);
                safe(() => cb.fail(err));
            } else {
                log.ok();
                safe(() => cb.ok());
            }
        });
    });
}
