import * as fs from "node:fs";
import { Logger } from "../../logger.js";
interface Callback<T> {
    ok: (obj: any) => T;
    fail: (error: Error) => T;
}
export async function read_json_file<R = any>(plog: Logger, name: string, cb: Callback<R>): Promise<R> {
    const log = plog.sub("read_json_file");
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
                try {
                    const obj = JSON.parse(text);
                    log.println("parse json ok");
                    safe(() => cb.ok(obj));
                } catch (err) {
                    log.error(err);
                    safe(() => cb.fail(err));
                }
            }
        });
    });
}
