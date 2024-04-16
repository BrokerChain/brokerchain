import * as fs from "node:fs";
import * as path from "node:path";
import { Logger } from "../../logger.js";
import { write_file } from "./write_file.js";
interface Item {
    name: string;
    content: Buffer;
}
interface Callback<T> {
    ok: () => T;
    fail: (err: Error) => T;
}
export async function write_multi_file<T = any>(
    plog: Logger,
    opt: {
        dir: string;
        items: Item[];
    },
    cb: Callback<T>
): Promise<T> {
    const log = plog.sub("write_multi_file");
    let last_error: Error = null;
    await Promise.all(
        opt.items.map((item) => {
            const fullname = path.resolve(opt.dir, item.name);
            return write_file(log, fullname, item.content, {
                ok: () => {
                    // ignore
                },
                fail: (err) => {
                    last_error = err;
                }
            });
        })
    );
    if (last_error) {
        return await cb.fail(last_error);
    } else {
        return await cb.ok();
    }
}
