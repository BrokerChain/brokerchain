import { Logger } from "../../../../myutils/logger.js";
import { guid } from "../../../../myutils/common/guid.js";
import * as kv from "../simple-coll/index.js";
interface IdItem {
    id: string;
}
export interface MakeAddCallback<T, R> {
    ok: (item: T) => R;
    fail: (err: Error) => R;
}
export function make_add_cb<T extends IdItem>(opt: { namespace: string; key: string }) {
    const { namespace, key } = opt;
    return async function add<R>(plog: Logger, item: T, cb: MakeAddCallback<T, R>): Promise<R> {
        const log = plog.sub(`store.${namespace}.${key}.add`);
        log.variable("item", item);
        if (item.id) {
            return cb.fail(log.new_error("id must be empty"));
        }
        // fill id
        item.id = guid();
        log.variable("id", item.id);
        return await kv.collection_item_add(
            log,
            {
                namespace,
                key,
                item
            },
            {
                ok: () => {
                    return cb.ok(item);
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            }
        );
    };
}
