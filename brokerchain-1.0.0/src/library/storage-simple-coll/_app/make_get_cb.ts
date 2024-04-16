import { Logger } from "../../../myutils/logger.js";
import { IdItem } from "../_type/index.js";
import { collection_get_one } from "../collection-get-one/export.js";

export interface MakeGetCallback<T, R> {
    none: () => R;
    ok: (item: T) => R;
    fail: (err: Error) => R;
}
export function make_get_cb<T extends IdItem>(opt: { namespace: string; key: string }) {
    const { namespace, key } = opt;
    return async function get<R>(plog: Logger, id: string, cb: MakeGetCallback<T, R>): Promise<R> {
        const log = plog.sub(`store.${namespace}.${key}.get`);
        log.variable("id", id);
        return await collection_get_one(
            log,
            {
                namespace,
                key,
                match: (item) => item.id === id
            },
            {
                none: () => {
                    return cb.none();
                },
                ok: (item: T) => {
                    return cb.ok(item);
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            }
        );
    };
}
