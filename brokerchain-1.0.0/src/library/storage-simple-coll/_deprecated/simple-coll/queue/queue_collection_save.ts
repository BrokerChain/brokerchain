import { Logger } from "../../../../../myutils/logger.js";
import { collection_save } from "../disk/collection_save.js";
import * as Queue from "../../../../../myutils/common/queue2/index.js";
import { Collection } from "../type/index.js";
interface Callback<R> {
    ok: () => R;
    fail: (err: Error) => R;
}
const queue = Queue.create(new Logger("queue_collection_save"));
export async function queue_collection_save<R>(plog: Logger, data: Collection<any>, cb: Callback<R>): Promise<R> {
    const log = plog.sub("queue_collection_save");
    return await queue.add(log, data, async (_) => {
        return await collection_save(log, data, cb);
    });
}
