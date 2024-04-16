import { Logger } from "../../../../../myutils/logger.js";
import * as dirname from "./dirname/index.js";
import { read_json_file } from "../../../../../myutils/node/file/index.js";
interface Callback<R> {
    ok: (data: any) => R;
    fail: (err: Error) => R;
}
export async function collection_item_get<R>(
    plog: Logger,
    target: {
        namespace: string;
        key: string;
        id: string;
    },
    cb: Callback<R>
): Promise<R> {
    const log = plog.sub("collection_item_get");
    const { namespace, key, id } = target;
    const item_file = dirname.resolve_item(namespace, key, id);
    log.variable("namespace", namespace);
    log.variable("key", key);
    log.variable("id", id);
    log.variable("item_file", item_file);
    const result = await read_json_file(log, item_file, {
        ok: async (item) => {
            log.ok();
            return cb.ok(item);
        },
        fail: async (err) => {
            log.fail();
            return cb.fail(err);
        }
    });
    return result;
}
