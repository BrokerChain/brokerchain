import { Logger } from "../../../myutils/logger.js";
import { IdItem } from "../_type/index.js";
import { collection_get } from "../collection-get/export.js";
import { collection_item_add } from "../collection-item-add/export.js";

// [note]
// - all       : update all the items matched
// - first-one : update the first one and ignore the rest
// - only-one  : report error if there are more than one items matched

export type Mode = "all" | "first-one" | "only-one";

export interface MakeUpdateCallback<T, R> {
    none: () => R;
    ok: (items: T[]) => R;
    fail: (err: Error) => R;
}

// FIXME transaction protection
// - this function may cause data corrouption when requested
//   to update multiple items but error happens
//   some items are updated, while others are not
// - to solve it, there must be some transaction protection here

export function make_update_cb<T extends IdItem>(opt: { namespace: string; key: string; sort?: (a: T, b: T) => number }) {
    const { namespace, key } = opt;
    return async function update<R>(
        plog: Logger,
        opts: {
            mode: Mode;
            match: (item: T) => boolean;
            sort?: (a: T, b: T) => number;
            update: (item: T, i: number) => T;
        },
        cb: MakeUpdateCallback<T, R>
    ): Promise<R> {
        const log = plog.sub(`store.${namespace}.${key}.update`);
        log.warn("FIXME transaction protection required!");
        const mode = opts.mode;
        log.variable("mode", mode);
        return await collection_get(
            log,
            {
                namespace,
                key
            },
            {
                empty: async () => {
                    return cb.none();
                },
                ok: async (output) => {
                    let list = output.items as T[];
                    list = list.filter(opts.match);
                    const matched_count = list.length;
                    log.variable("matched_count", matched_count);
                    // possible to have a empty list after filtering
                    if (!list.length) {
                        return cb.none();
                    }
                    if (opts.sort) {
                        list.sort(opts.sort);
                    }
                    switch (mode) {
                        case "all":
                            // nothing
                            break;
                        case "first-one":
                            if (list.length > 1) {
                                list = list.slice(0, 1);
                            }
                            break;
                        case "only-one":
                            if (list.length > 1) {
                                return cb.fail(log.new_error(`more than one items matached in ${mode} mode`));
                            }
                            break;
                        default:
                            return cb.fail(log.new_error("unexpected mode"));
                    }
                    let error: Error | null = null;
                    for (const [i, item] of list.entries()) {
                        log.variable("update_before", item);
                        const new_item = opts.update(item, i);
                        log.variable("update_after", new_item);
                        // this api can be used to override existing one
                        await collection_item_add(
                            log,
                            {
                                namespace,
                                key,
                                item: new_item
                            },
                            {
                                ok: () => {
                                    // ignore
                                },
                                fail: (err) => {
                                    error = err;
                                }
                            }
                        );
                        if (error) {
                            if (list.length > 1) {
                                log.warn("data corruption may happens here cause an error breaks the updating operations!");
                            }
                            return cb.fail(error);
                        }
                    }
                    return cb.ok(list);
                },
                fail: async (err) => {
                    return cb.fail(err);
                }
            }
        );
    };
}
