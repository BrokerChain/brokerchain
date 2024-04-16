import { Logger } from "../../logger.js";
import * as path from "node:path";
import * as fs from "node:fs";
interface Callback<T> {
    ok: () => T;
    fail: (error: Error) => T;
}
export function write_file<R>(plog: Logger, name: string, content: Buffer | string, cb: Callback<R>): Promise<R> {
    const log = plog.sub("write_file");
    log.variable("name", name);
    // log.variable("content", content);
    return new Promise((resolve, reject) => {
        function safe(exp: () => R) {
            try {
                resolve(exp());
            } catch (err) {
                log.error(err);
                reject(err);
            }
        }
        try {
            const base_dir = path.dirname(name);
            fs.mkdirSync(base_dir, { recursive: true });
            fs.writeFile(name, content, {}, (err) => {
                if (err) {
                    log.error(err);
                    log.fail();
                    safe(() => cb.fail(err));
                } else {
                    log.println(content.length + " bytes wrote");
                    log.ok();
                    safe(() => cb.ok());
                }
            });
        } catch (err) {
            log.error(err);
            log.fail();
            safe(() => cb.fail(err));
        }
    });
}
