import { Logger } from "../../../../myutils/logger.js";
import * as kv from "../simple-coll/index.js";
import { IdItem } from "../simple-coll/type/index.js";
import { ListEngine } from "./_/index.js";
export interface MakeLsCallback<T extends IdItem, R> {
    empty: () => R;
    ok: (item: T[], engine: ListEngine<T>) => R;
    fail: (err: Error) => R;
}
export function make_ls_cb<T extends IdItem>(opt: {
    namespace: string;
    key: string;
    sort?: (a: T, b: T) => number; // default sort algorithm, can be overrided
}) {
    const { namespace, key } = opt;
    const default_sort = opt.sort;
    return async function ls<R>(
        plog: Logger,
        opts: {
            // [note]
            //
            // - when both 'id_list' and 'filter' options are provided,
            //   the collection will be filtered by 'id_list' first,
            //   then be filtered by 'filter' callback.
            //
            // - use 'id_list' is O(1), however use 'filter' is O(n)
            //
            id_list?: string[];
            filter?: (item: T) => boolean;
            sort?: (a: T, b: T) => number;
        },
        cb: MakeLsCallback<T, R>
    ): Promise<R> {
        const log = plog.sub(`store.${namespace}.${key}.ls`);
        const sort = opts.sort || default_sort;
        // empty id_list means no one is needed
        // return early here, because this happens a lot
        if (opts.id_list && opts.id_list.length === 0) {
            return cb.empty();
        }
        return await kv.collection_get(
            log,
            {
                namespace,
                key
            },
            {
                empty: () => {
                    return cb.empty();
                },
                ok: (list: T[]) => {
                    const filtered_list = apply_filter(list);
                    // possible to have a empty list after filtering
                    if (!filtered_list.length) {
                        return cb.empty();
                    }
                    const sorted_list = apply_sort(filtered_list);
                    return cb.ok(sorted_list, new ListEngine(sorted_list));
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            }
        );
        function apply_filter(list: T[]) {
            if (opts) {
                // FIXME
                // optimization needed!
                // the id filter should be O(1) not O(n)
                if (opts.id_list) {
                    const id_set = new Set(opts.id_list);
                    list = list.filter((item) => id_set.has(item.id));
                }
                if (opts.filter) {
                    list = list.filter(opts.filter);
                }
            }
            return list;
        }
        function apply_sort(list: T[]) {
            if (sort) {
                const sorted_list = list.slice();
                sorted_list.sort(sort);
                return sorted_list;
            } else {
                return list;
            }
        }
    };
}
