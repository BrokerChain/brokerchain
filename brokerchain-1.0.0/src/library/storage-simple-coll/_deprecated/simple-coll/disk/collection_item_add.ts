import { Logger } from "../../../../../myutils/logger.js";
import * as dirname from "./dirname/index.js";
import { write_json_file } from "../../../../../myutils/node/file/index.js";
import { IdItem } from "../type/index.js";
export interface Callback<R> {
    ok: () => R;
    fail: (err: Error) => R;
}
export async function collection_item_add<T extends IdItem, R>(
    plog: Logger,
    target: {
        namespace: string;
        key: string;
        item: T;
    },
    cb: Callback<R>
): Promise<R> {
    const log = plog.sub("collection_item_add");
    const { namespace, key, item } = target;
    // check id
    if (!target.item.id) {
        const err = new Error("item.id not exists: " + JSON.stringify(target.item));
        log.error(err);
        return cb.fail(err);
    }
    const item_file = dirname.resolve_item(namespace, key, target.item.id);
    log.variable("namespace", namespace);
    log.variable("key", key);
    log.variable_debug("item", item);
    log.variable("item_file", item_file);
    const result = write_json_file(log, item_file, target.item, {
        ok: () => {
            return cb.ok();
        },
        fail: (err) => {
            return cb.fail(err);
        }
    });
    return result;
}
