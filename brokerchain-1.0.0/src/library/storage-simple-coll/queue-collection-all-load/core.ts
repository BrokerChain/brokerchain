// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { disk_collection_ls } from "../disk-collection-ls/export.js";
import { queue_collection_load } from "../queue-collection-load/export.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.queue-collection-all-load");
    log.variable("input", input);

    try {
        const output: Output = {
            version: 2,
            items: []
        };

        const collections: {
            namespace: string;
            key: string;
        }[] = await disk_collection_ls(
            log,
            {},
            {
                ok: ({ list }) => {
                    return list;
                },
                fail: (err) => {
                    log.warn(err);
                    return [];
                }
            }
        );

        // load all collections
        log.variable_debug("collections", collections);
        for (let item of collections) {
            const err = await queue_collection_load(log, item, {
                ok: (coll) => {
                    output.items.push(coll);
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
        return cb.ok(output);
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
