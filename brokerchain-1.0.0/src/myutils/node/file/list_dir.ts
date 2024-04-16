import * as fs from "node:fs";
import { Logger } from "../../logger.js";
import { list_item } from "./list_item.js";
export interface Item {
    name: string;
    fullname: string;
    stats: fs.Stats;
}
interface Callback<T> {
    empty: () => T;
    ok: (items: Item[]) => T;
    fail: (err: Error) => T;
}
export async function list_dir<T = any>(
    plog: Logger,
    opt: {
        dir: string;
        filter?: (item: Item) => boolean;
    },
    cb: Callback<T>
): Promise<T> {
    const log = plog.sub("list_dir");
    const { dir, filter } = opt;
    log.variable("dir", dir);
    const result = await list_item<T>(log, dir, {
        empty: () => {
            log.println("empty");
            const result = cb.empty();
            return result;
        },
        ok: (items) => {
            log.ok();
            // log.variable("items", items);
            const dir_items = items.filter((item) => item.stats.isDirectory());
            // log.variable("dir_items", dir_items);
            const matched_items = filter ? dir_items.filter(filter) : dir_items;
            const result = cb.ok(matched_items);
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
