import * as fs from "node:fs";
import { Logger } from "../../logger.js";
import { list_file } from "./list_file.js";
import { read_file } from "./read_file.js";
interface Item {
    name: string;
    fullname: string;
    stats: fs.Stats;
}
interface FileItem extends Item {
    content: Buffer;
}
interface Callback<T> {
    empty: () => T;
    ok: (items: FileItem[]) => T;
    fail: (err: Error) => T;
}
export async function read_multi_file<T = any>(
    plog: Logger,
    opt: {
        dir: string;
        filter?: (item: Item) => boolean;
        sort?: (a: Item, b: Item) => number;
    },
    cb: Callback<T>
): Promise<T> {
    const log = plog.sub("read_multi_file");
    let result: T = await list_file(log, opt.dir, {
        empty: async () => {
            log.println("empty");
            const result = cb.empty();
            // log.variable("result", result);
            return result;
        },
        ok: async (items) => {
            log.ok();
            // log.variable("items", items);
            const matched_items = opt.filter ? items.filter(opt.filter) : items;
            // log.variable("matched_items", matched_items);
            const files: FileItem[] = [];
            let last_err: Error = null;
            for (let item of matched_items) {
                await read_file(log, item.fullname, {
                    ok: (data) => {
                        files.push({
                            name: item.name,
                            fullname: item.fullname,
                            stats: item.stats,
                            content: data
                        });
                    },
                    fail: (err) => {
                        last_err = err;
                    }
                });
                if (last_err) {
                    return cb.fail(last_err);
                }
            }
            if (opt.sort) {
                files.sort(opt.sort);
            } else {
                // sort by create time, new to old
                files.sort((a, b) => b.stats.ctime.valueOf() - a.stats.ctime.valueOf());
            }
            return cb.ok(files);
            // disabled: open too many files may fail
            // FIXME improve performance
            // await Promise.all(
            //     matched_items.map((item) => {
            //         return read_file(log, item.fullname, {
            //             ok: (data) => {
            //                 files.push({
            //                     name: item.name,
            //                     fullname: item.fullname,
            //                     stats: item.stats,
            //                     content: data
            //                 });
            //             },
            //             fail: (err) => {
            //                 last_err = err;
            //             }
            //         });
            //     })
            // );
            // if (last_err) {
            //     return cb.fail(last_err);
            // } else {
            //     return cb.ok(files);
            // }
        },
        fail: async (err) => {
            log.fail();
            return cb.fail(err);
        }
    });
    // log.variable("result", result);
    return result;
}
