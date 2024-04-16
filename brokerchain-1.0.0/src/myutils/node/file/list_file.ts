import * as fs from "node:fs";
import { Logger } from "../../logger.js";
import { list_item } from "./list_item.js";
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
export async function list_file<T = any>(plog: Logger, dir: string, cb: Callback<T>): Promise<T> {
    const log = plog.sub("list_file");
    const result = await list_item<T>(log, dir, {
        empty: () => {
            log.println("empty");
            const result = cb.empty();
            return result;
        },
        ok: (items) => {
            log.ok();
            // log.variable("items", items);
            const file_items = items.filter((item) => item.stats.isFile());
            // log.variable("file_items", file_items);
            const result = cb.ok(file_items);
            // log.variable("result", result);
            return result;
        },
        fail: (err) => {
            log.fail();
            const result = cb.fail(err);
            // log.variable("result", result);
            return result;
        }
    });
    return result;
}
