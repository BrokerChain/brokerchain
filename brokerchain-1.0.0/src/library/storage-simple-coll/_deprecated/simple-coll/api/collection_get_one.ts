import { Logger } from "../../../../../myutils/logger.js";
import { IdItem } from "../type/index.js";
import { collection_get } from "./collection_get.js";
export async function collection_get_one<T extends IdItem, R>(
    plog: Logger,
    opt: {
        namespace: string;
        key: string;
        match: (item: T) => boolean;
    },
    cb: {
        none: () => R;
        ok: (item: T) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("simple-coll").sub("collection_get_one");
    const { namespace, key, match } = opt;
    log.variable("namespace", namespace);
    log.variable("key", key);
    return collection_get(
        log,
        {
            namespace,
            key,
            filter: (item: T) => match(item)
        },
        {
            empty: () => {
                return cb.none();
            },
            ok: (items) => {
                return cb.ok(items[0]);
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
