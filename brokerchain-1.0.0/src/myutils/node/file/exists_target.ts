import { Logger } from "../../logger.js";
import * as fs from "node:fs";
interface Callback<T> {
    yes: () => T;
    no: () => T;
    fail: (error: Error) => T;
}
export function exists_target<R>(
    plog: Logger,
    opts: {
        name: string;
        match?: (status: fs.Stats) => boolean;
    },
    cb: Callback<R>
): Promise<R> {
    const log = plog.sub("exists_target");
    const { name } = opts;
    log.variable("name", name);
    const match = opts.match || (() => true); // by default, always match
    return new Promise((resolve, reject) => {
        function safe(exp: () => R) {
            try {
                resolve(exp());
            } catch (err) {
                log.error(err);
                reject(err);
            }
        }
        fs.stat(name, (err, status) => {
            if (err) {
                log.warn(err);
                safe(() => cb.no());
            } else {
                // log.variable("status", status);
                const is_matched = match(status);
                log.variable("is_matched", is_matched);
                if (is_matched) {
                    safe(() => cb.yes());
                } else {
                    safe(() => cb.no());
                }
            }
        });
    });
}
