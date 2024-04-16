import { Logger } from "../../../../../myutils/logger.js";
import { collection_load } from "../disk/collection_load.js";
import * as Queue from "../../../../../myutils/common/queue2/index.js";
import { Collection } from "../type/index.js";
import * as cache from "../cache/index.js";
interface Callback<R> {
    ok: (data: Collection<any>) => R;
    fail: (err: Error) => R;
}
const queue = Queue.create(new Logger("queue_collection_load"));
export function queue_collection_load<R>(
    plog: Logger,
    target: {
        namespace: string;
        key: string;
    },
    cb: Callback<R>
): Promise<R> {
    const log = plog.sub("queue_collection_load");
    const { namespace, key } = target;
    // NOTE carefully handle exception
    return new Promise<R>((resolve, reject) => {
        // check from cache first
        // NOTE cache.get is a sync function
        cache.get(
            log,
            { namespace, key },
            {
                ok: (coll) => {
                    // cache hit, just return
                    // NOTE if any exception throwed from cb.ok() is ok
                    const result = cb.ok(coll);
                    resolve(result);
                },
                not_found: () => {
                    // NOTE dangerous region begins from here...
                    // because callback function will be invoked later
                    // it is important to handle throwed exceptions inside it
                    queue.add(log, target, (_) => {
                        // check from cache again
                        // cause this callback maybe invoked after a while
                        // and cache can be changed
                        cache.get(
                            log,
                            { namespace, key },
                            {
                                ok: (coll) => {
                                    try {
                                        const result = cb.ok(coll);
                                        resolve(result);
                                    } catch (err) {
                                        reject(err);
                                    }
                                },
                                not_found: () => {
                                    // cache miss
                                    collection_load(log, target, {
                                        ok: (coll) => {
                                            cache.set(log, { namespace, key }, coll);
                                            try {
                                                const result = cb.ok(coll);
                                                resolve(result);
                                            } catch (err) {
                                                reject(err);
                                            }
                                        },
                                        fail: (err) => {
                                            try {
                                                const result = cb.fail(err);
                                                resolve(result);
                                            } catch (err) {
                                                reject(err);
                                            }
                                        }
                                    });
                                }
                            }
                        );
                    });
                }
            }
        );
    });
}
