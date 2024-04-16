import { Logger } from "../../../../myutils/logger.js";
import * as kv from "../simple-coll/index.js";
import { IdItem } from "../simple-coll/type/index.js";
// deprecated, use cb version instead
export function make_ls<T extends IdItem>(opt: { namespace: string; key: string; sort?: (a: T, b: T) => number }) {
    const { namespace, key } = opt;
    return async function ls(
        plog: Logger,
        opts?: {
            filter?: (item: T) => boolean;
        }
    ): Promise<T[]> {
        const log = plog.sub(`store.${namespace}.${key}.ls`);
        let list = await kv.collection_get(
            log,
            {
                namespace,
                key
            },
            {
                empty: () => {
                    return [];
                },
                ok: (items) => items,
                fail: (err) => {
                    throw err;
                }
            }
        );
        if (opts) {
            if (opts.filter) {
                list = list.filter(opts.filter);
            }
        }
        if (opt.sort) {
            const sorted_list = list.slice();
            sorted_list.sort(opt.sort);
            return sorted_list;
        } else {
            return list;
        }
    };
}
