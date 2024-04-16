import { Logger } from "../../logger.js";
import * as path from "node:path";
import * as fs from "node:fs";
interface Callback<T> {
    ok: () => T;
    fail: (error: Error) => T;
}
export function del_file<R>(plog: Logger, name: string, cb: Callback<R>): Promise<R> {
    const log = plog.sub("del_file");
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
        fs.unlink(name, (err) => {
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
