import * as fs from "node:fs";
import * as path from "node:path";
import { Logger } from "../../logger.js";
interface Item {
    name: string;
    fullname: string;
    stats: fs.Stats;
}
interface Callback<T> {
    empty: () => T;
    ok: (items: Item[]) => T;
    fail: (err: Error) => T;
}
export type ListItemItem = Item;
export async function list_item<R = any>(plog: Logger, dir: string, cb: Callback<R>): Promise<R> {
    const log = plog.sub("list_item");
    return new Promise((resolve, reject) => {
        function safe(exp: () => R) {
            try {
                resolve(exp());
            } catch (err) {
                log.error(err);
                reject(err);
            }
        }
        fs.readdir(dir, async (err, name_list) => {
            if (err) {
                log.error(err);
                safe(() => cb.fail(err));
                return;
            }
            name_list = name_list || [];
            const items: Item[] = [];
            if (name_list.length < 1) {
                log.println("empty");
                safe(() => cb.empty());
                return;
            }
            let stat_done = 0;
            // log.variable("name_list", name_list);
            name_list.forEach((name) => {
                const fullname = path.resolve(dir, name);
                log.variable("fullname", fullname);
                fs.stat(fullname, async (err2, stats) => {
                    stat_done++;
                    // it's possible get stat info fail
                    // for exsample, on mac it is ok to list items at "/"
                    // but when stat each one, it failed at "/.VolumeIcon.icns"
                    // just ignore the items that can't stat
                    if (err2) {
                        log.warn(err2);
                        log.println("ignore state failed item: " + fullname);
                    } else {
                        items.push({
                            name,
                            fullname,
                            stats
                        });
                    }
                    log.variable("stat_done", stat_done);
                    // finish?
                    if (stat_done === name_list.length) {
                        log.ok();
                        // log.variable("items", items);
                        safe(() => cb.ok(items));
                        return;
                    }
                });
            });
        });
    });
}
