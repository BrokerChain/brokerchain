import { Logger } from "../../../../../myutils/logger.js";
import { queue_collection_load } from "./queue_collection_load.js";
import { collection_ls } from "../disk/collection_ls.js";
import { StoreV2 } from "../type/index.js";
interface Callback<R> {
    ok: (data: StoreV2) => R;
    fail: (err: Error) => R;
}
export async function queue_all_load<R>(plog: Logger, cb: Callback<R>): Promise<R> {
    const log = plog.sub("queue_all_load");
    const data: StoreV2 = {
        version: 2,
        items: []
    };
    const collections: {
        namespace: string;
        key: string;
    }[] = await collection_ls(log, {
        ok: (items) => {
            return items;
        },
        fail: (err) => {
            log.warn(err);
            return [];
        }
    });
    // load all collections
    log.variable_debug("collections", collections);
    for (let item of collections) {
        const err = await queue_collection_load(log, item, {
            ok: (coll) => {
                data.items.push(coll);
                return null;
            },
            fail: (err) => {
                // all collection must be load succesfully
                // even one fail will cause the whole fail
                log.println(`load collection failed, please fix it, namspace=${item.namespace}, key=${item.key}`);
                return err;
            }
        });
        if (err) {
            log.fail();
            return cb.fail(err);
        }
    }
    log.ok();
    return cb.ok(data);
}
