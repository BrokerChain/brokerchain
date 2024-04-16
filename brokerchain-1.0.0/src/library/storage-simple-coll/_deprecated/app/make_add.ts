import { Logger } from "../../../../myutils/logger.js";
import * as kv from "../simple-coll/index.js";
interface IdItem {
    id: string;
}
// deprecated, use cb version instead
export function make_add<T extends IdItem>(opt: { namespace: string; key: string }) {
    const { namespace, key } = opt;
    return async function add(plog: Logger, item: T) {
        const log = plog.sub(`store.${namespace}.${key}.add`);
        log.variable("item", item);
        await kv.collection_item_add(
            log,
            {
                namespace,
                key,
                item
            },
            {
                ok: () => {
                    // ignore
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    };
}
