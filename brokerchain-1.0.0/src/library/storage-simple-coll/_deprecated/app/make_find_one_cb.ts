import { Logger } from "../../../../myutils/logger.js";
import * as kv from "../simple-coll/index.js";
import { IdItem } from "../simple-coll/type/index.js";
export interface MakeFindOneCallback<T, R> {
    none: () => R;
    ok: (item: T) => R;
    fail: (err: Error) => R;
}
export function make_find_one_cb<T extends IdItem>(opt: { namespace: string; key: string; sort?: (a: T, b: T) => number }) {
    const { namespace, key } = opt;
    return async function find_one<R>(
        plog: Logger,
        opts: {
            match: (item: T) => boolean;
            treat_more_than_one_error?: boolean; // default false
        },
        cb: MakeFindOneCallback<T, R>
    ): Promise<R> {
        const log = plog.sub(`store.${namespace}.${key}.find_one`);
        log.variable("treat_more_than_one_error", opts.treat_more_than_one_error ? true : false);
        return await kv.collection_get(
            log,
            {
                namespace,
                key
            },
            {
                empty: () => {
                    return cb.none();
                },
                ok: (list: T[]) => {
                    list = list.filter(opts.match);
                    const matched_count = list.length;
                    log.variable("matched_count", matched_count);
                    // possible to have a empty list after filtering
                    if (!list.length) {
                        return cb.none();
                    } else {
                        if (opts.treat_more_than_one_error) {
                            if (list.length > 1) {
                                return cb.fail(log.new_error("more than one i"));
                            } else {
                                return cb.ok(list[0]);
                            }
                        } else {
                            return cb.ok(list[0]);
                        }
                    }
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            }
        );
    };
}
