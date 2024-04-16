import { Logger } from "../../logger.js";
import * as fs from "node:fs";
interface Callback<T> {
    ok: (data: Buffer) => T;
    fail: (error: Error) => T;
}
export function read_file<R>(plog: Logger, name: string, cb: Callback<R>): Promise<R> {
    const log = plog.sub("read_file");
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
        fs.readFile(name, (err, data) => {
            if (err) {
                log.error(err);
                safe(() => cb.fail(err));
            } else {
                log.println(data.length + " bytes read");
                safe(() => cb.ok(data));
            }
        });
    });
}
export function read_file_sync<T = any>(plog: Logger, name: string, cb: Callback<T>): T {
    const log = plog.sub("read_file");
    log.variable("name", name);
    try {
        const data = fs.readFileSync(name);
        log.println(data.length + " bytes read");
        // log.variable('data', data)
        return cb.ok(data);
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
}
