import { Logger } from "../../../../../myutils/logger.js";
import * as dirname from "./dirname/index.js";
import { del_file } from "../../../../../myutils/node/file/index.js";
import { IdItem } from "../type/index.js";
interface Callback<R> {
    ok: () => R;
    fail: (err: Error) => R;
}
export async function collection_item_del<T extends IdItem, R>(
    plog: Logger,
    target: {
        namespace: string;
        key: string;
        item_id: string;
    },
    cb: Callback<R>
): Promise<R> {
    const log = plog.sub("collection_item_del");
    const { namespace, key, item_id } = target;
    const item_file = dirname.resolve_item(namespace, key, item_id);
    log.variable("namespace", namespace);
    log.variable("key", key);
    log.variable_debug("item_id", item_id);
    log.variable("item_file", item_file);
    const result = del_file(log, item_file, {
        ok: () => {
            return cb.ok();
        },
        fail: (err) => {
            return cb.fail(err);
        }
    });
    return result;
}
