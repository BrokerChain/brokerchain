import { Logger } from "../../../../myutils/logger.js";
import * as kv from "../simple-coll/index.js";
interface IdItem {
    id: string;
}
export interface MakeSetCallback<T, R> {
    none: () => R;
    ok: (item: T) => R;
    fail: (err: Error) => R;
}
export function make_set_cb<T extends IdItem>(opt: { namespace: string; key: string }) {
    const { namespace, key } = opt;
    return async function set<R>(plog: Logger, item: T, cb: MakeSetCallback<T, R>): Promise<R> {
        const log = plog.sub(`store.${namespace}.${key}.add`);
        log.variable("item", item);
        if (!item.id) {
            return cb.fail(log.new_error("id must not be empty"));
        }
        // TODO should invoke only one kv api to finish the job
        // FIXME it is possible to delete between two calls, makes bugs
        return await kv.collection_get_one(
            log,
            { namespace, key, match: (o) => o.id === item.id },
            {
                none: async () => {
                    return cb.none();
                },
                ok: async () => {
                    // this api can be used to override existing one
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
                },
                fail: async (err) => {
                    return cb.fail(err);
                }
            }
        );
    };
}
