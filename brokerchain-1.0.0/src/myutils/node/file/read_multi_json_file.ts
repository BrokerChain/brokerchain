import * as fs from "node:fs";
import { Logger } from "../../logger.js";
import { read_multi_file } from "./read_multi_file.js";
interface Item {
    name: string;
    fullname: string;
    stats: fs.Stats;
}
interface FileItem<T> extends Item {
    content: T;
}
interface Callback<R, T> {
    empty: () => R;
    ok: (items: FileItem<T>[]) => R;
    fail: (err: Error) => R;
}
export async function read_multi_json_file<R = any, T = any>(
    plog: Logger,
    opt: {
        dir: string;
        filter?: (item: Item) => boolean;
        sort?: (a: Item, b: Item) => number;
    },
    cb: Callback<R, T>
): Promise<R> {
    const log = plog.sub("read_multi_json_file");
    log.variable("dir", opt.dir);
    let result: R = await read_multi_file(
        log,
        {
            dir: opt.dir,
            filter: (item) => {
                const is_json_file = /\.json$/i.test(item.name);
                if (!is_json_file) {
                    return false;
                }
                if (opt.filter) {
                    return opt.filter(item);
                } else {
                    return true;
                }
            },
            sort: opt.sort
        },
        {
            empty: () => {
                log.println("empty");
                return cb.empty();
            },
            ok: (files) => {
                log.ok();
                try {
                    const json_files: FileItem<any>[] = files.map((item) => {
                        log.println("parse " + item.fullname);
                        return {
                            name: item.name,
                            fullname: item.fullname,
                            stats: item.stats,
                            content: JSON.parse(item.content.toString("utf8"))
                        };
                    });
                    return cb.ok(json_files);
                } catch (err) {
                    log.error(err);
                    return cb.fail(err);
                }
            },
            fail: (err) => {
                log.fail();
                return cb.fail(err);
            }
        }
    );
    // log.variable("result", result);
    return result;
}
