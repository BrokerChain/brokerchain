import * as fs from "node:fs";
import { Logger } from "../../logger.js";
interface Callback<T> {
    ok: (text: string) => T;
    fail: (error: Error) => T;
}
export async function read_text_file<R = any>(plog: Logger, name: string, cb: Callback<R>): Promise<R> {
    const log = plog.sub("read_text_file");
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
        fs.readFile(name, { encoding: "utf8" }, (err, text) => {
            if (err) {
                log.error(err);
                safe(() => cb.fail(err));
            } else {
                log.println(text.length + " chars read");
                safe(() => cb.ok(text));
            }
        });
    });
}
