import * as fs from "node:fs";
import { Logger } from "../../logger.js";
import { list_file } from "./list_file.js";
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
export async function list_file_of_pattern<T = any>(
    plog: Logger,
    opt: {
        dir: string;
        pattern: RegExp;
        sort?: (a: Item, b: Item) => number;
    },
    cb: Callback<T>
): Promise<T> {
    const log = plog.sub("list_file_of_pattern");
    const result = await list_file<T>(log, opt.dir, {
        empty: () => {
            log.println("empty");
            return cb.empty();
        },
        ok: (items) => {
            const matched_items = items.filter((item) => {
                const match = opt.pattern.test(item.name);
                log.println(`name=${JSON.stringify(item.name)} match=${match}`);
                return match;
            });
            if (!matched_items.length) {
                log.println("empty (no matched)");
                return cb.empty();
            }
            console.log(matched_items);
            if (opt.sort) {
                matched_items.sort(opt.sort);
            }
            console.log(matched_items);
            log.ok();
            return cb.ok(matched_items);
        },
        fail: (err) => {
            log.fail();
            return cb.fail(err);
        }
    });
    log.variable("result", result);
    return result;
}
