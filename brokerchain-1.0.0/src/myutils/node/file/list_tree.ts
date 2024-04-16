import * as fs from "node:fs";
import { Logger } from "../../logger.js";
import { list_item } from "./list_item.js";
export interface Item {
    name: string;
    fullname: string;
    stats: fs.Stats;
    children: Item[];
}
interface Callback<T> {
    empty: () => T;
    ok: (items: Item[]) => T;
    fail: (err: Error) => T;
}
export async function list_tree<T = any>(
    plog: Logger,
    opt: {
        dir: string;
        filter_file?: (item: Item) => boolean;
        filter_dir?: (item: Item) => boolean;
    },
    cb: Callback<T>
): Promise<T> {
    const log = plog.sub("list_tree");
    const { dir } = opt;
    log.variable("dir", dir);
    return await list_item(log, dir, {
        empty: async () => {
            return cb.empty();
        },
        ok: async (list) => {
            const root_list = list
                .map((item) => ({
                    name: item.name,
                    fullname: item.fullname,
                    stats: item.stats,
                    children: []
                }))
                .filter((item) => {
                    if (item.stats.isFile()) {
                        return opt.filter_file ? opt.filter_file(item) : true;
                    } else if (item.stats.isDirectory()) {
                        return opt.filter_dir ? opt.filter_dir(item) : true;
                    } else {
                        return true;
                    }
                });
            for (let item of root_list) {
                if (!item.stats.isDirectory()) continue;
                log.println("enter directory: " + item.fullname);
                // recursive here
                await list_tree(
                    plog,
                    {
                        dir: item.fullname,
                        filter_file: opt.filter_file,
                        filter_dir: opt.filter_dir
                    },
                    {
                        empty: async () => {
                            // ignore
                        },
                        ok: async (sub_list) => {
                            item.children = sub_list;
                        },
                        fail: async (err) => {
                            // tolerate
                            log.warn("tolerate error");
                        }
                    }
                );
            }
            return cb.ok(root_list);
        },
        fail: async (err) => {
            return cb.fail(err);
        }
    });
}
