import { Logger } from "../../../../../myutils/logger.js";
import { queue_all_load } from "../queue/index.js";
export async function init<R>(
    plog: Logger,
    cb: {
        ok: () => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("simple-coll").sub("init");
    log.println("begin");
    return await queue_all_load(log, {
        ok: (data) => {
            log.println(`ok, ${data.items.length} collections loaded`);
            return cb.ok();
        },
        fail: (err) => {
            log.error(err);
            return cb.fail(err);
        }
    });
}
