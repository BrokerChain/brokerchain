import { Logger } from "../../../../myutils/logger.js";
import * as kv from "../simple-coll/index.js";
import { IdItem } from "../simple-coll/type/index.js";
export interface MakeDelMatchedCallback<T, R> {
    none: () => R;
    ok: (deleted_items: T[]) => R;
    fail: (err: Error) => R;
}
export function make_del_matched_cb<T extends IdItem>(opt: { namespace: string; key: string }) {
    const { namespace, key } = opt;
    return async function del_matched<R>(
        plog: Logger,
        opts: {
            match: (item: T) => boolean;
        },
        cb: MakeDelMatchedCallback<T, R>
    ): Promise<R> {
        const log = plog.sub(`store.${namespace}.${key}.del_matched`);
        return await kv.collection_get(
            log,
            {
                namespace,
                key
            },
            {
                empty: async () => {
                    log.println("none, the collection is empty");
                    return cb.none();
                },
                ok: async (items: T[]) => {
                    const deleted_items: T[] = [];
                    for (let item of items) {
                        const match = opts.match(item);
                        if (match) {
                            deleted_items.push(item);
                            log.println("item of id matched: " + item.id);
                        }
                    }
                    if (!deleted_items.length) {
                        log.println("none, no one matched");
                        return cb.none();
                    }
                    try {
                        for (let item of deleted_items) {
                            await kv.collection_item_del(
                                log,
                                {
                                    namespace,
                                    key,
                                    item_id: item.id
                                },
                                {
                                    none: () => {
                                        // ignore, possible
                                        log.warn("delete target is not found, ignore");
                                    },
                                    ok: () => {
                                        // ignore
                                    },
                                    fail: (err) => {
                                        // ignore
                                        log.warn("delete item failed, this is the worst! throw and stop");
                                        throw err;
                                    }
                                }
                            );
                        }
                        return cb.ok(deleted_items);
                    } catch (err) {
                        // well, some items are deleted, and some are not...
                        // this can only be handled by the system administrator!
                        return cb.fail(err);
                    }
                },
                fail: async (err) => {
                    return cb.fail(err);
                }
            }
        );
    };
}
