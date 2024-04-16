import { Logger } from "../../../../myutils/logger.js";
import * as kv from "../simple-coll/index.js";
import { IdItem } from "../simple-coll/type/index.js";
// deprecated, use cb version instead
export function make_del<T extends IdItem>(opt: { namespace: string; key: string }) {
    const { namespace, key } = opt;
    return async function del(plog: Logger, id: string): Promise<boolean> {
        const log = plog.sub(`store.${namespace}.${key}.del`);
        log.variable("id", id);
        const found = await kv.collection_item_del(
            log,
            {
                namespace,
                key,
                item_id: id
            },
            {
                none: async () => {
                    return false;
                },
                ok: async (item: T) => {
                    return true;
                },
                fail: async (err) => {
                    throw err;
                }
            }
        );
        return found;
    };
}
