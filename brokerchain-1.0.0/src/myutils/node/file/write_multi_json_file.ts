import { Logger } from "../../logger.js";
import { write_multi_file } from "./write_multi_file.js";
interface Item {
    name: string;
    content: any;
}
interface Callback<T> {
    ok: () => T;
    fail: (err: Error) => T;
}
export async function write_multi_json_file<T = any>(
    plog: Logger,
    opt: {
        dir: string;
        items: Item[];
    },
    cb: Callback<T>
): Promise<T> {
    const log = plog.sub("write_multi_json_file");
    log.println("begin");
    try {
        // log.variable("items", opt.items);
        var file_items: {
            name: string;
            content: Buffer;
        }[] = opt.items.map((item) => {
            const text = JSON.stringify(item.content, null, 4);
            const buff = Buffer.from(text, "utf8");
            return {
                name: item.name,
                content: buff
            };
        });
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
    return await write_multi_file<T>(
        log,
        {
            dir: opt.dir,
            items: file_items
        },
        {
            ok: () => {
                return cb.ok();
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
