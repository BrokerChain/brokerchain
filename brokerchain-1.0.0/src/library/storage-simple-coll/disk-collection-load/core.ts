// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { collection_load } from "../_deprecated/simple-coll/disk/collection_load.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.disk-collection-load");
    log.variable("input", input);
    return await collection_load(
        log,
        {
            namespace: input.namespace,
            key: input.key
        },
        {
            ok: (coll) => {
                return cb.ok({
                    namespace: coll.namespace,
                    key: coll.key,
                    metadata: coll.metadata,
                    items: coll.items
                });
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
