import { Logger } from "../../../../myutils/logger.js";
import * as kv from "../simple-coll/index.js";
import { IdItem } from "../simple-coll/type/index.js";
export interface MakeDelCallback<T, R> {
    none: () => R;
    ok: (item: T) => R;
    fail: (err: Error) => R;
}
export function make_del_cb<T extends IdItem>(opt: { namespace: string; key: string }) {
    const { namespace, key } = opt;
    return async function del<R>(plog: Logger, id: string, cb: MakeDelCallback<T, R>): Promise<R> {
        const log = plog.sub(`store.${namespace}.${key}.del`);
        log.variable("id", id);
        return await kv.collection_item_del(
            log,
            {
                namespace,
                key,
                item_id: id
            },
            {
                none: async () => {
                    return cb.none();
                },
                ok: async (item: T) => {
                    return cb.ok(item);
                },
                fail: async (err) => {
                    return cb.fail(err);
                }
            }
        );
    };
}
