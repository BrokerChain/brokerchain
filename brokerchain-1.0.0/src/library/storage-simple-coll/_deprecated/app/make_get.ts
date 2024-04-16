import { Logger } from "../../../../myutils/logger.js";
import * as kv from "../simple-coll/index.js";
import { IdItem } from "../simple-coll/type/index.js";
// deprecated, use cb version instead
export function make_get<T extends IdItem>(opt: { namespace: string; key: string }) {
    const { namespace, key } = opt;
    return async function get(plog: Logger, id: string): Promise<T | null> {
        const log = plog.sub(`store.${namespace}.${key}.get`);
        log.variable("id", id);
        const target: T | null = await kv.collection_get_one(
            log,
            {
                namespace,
                key,
                match: (item) => item.id === id
            },
            {
                none: () => {
                    return null;
                },
                ok: (item) => {
                    return item;
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
        return target;
    };
}
