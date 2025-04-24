// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { watcher_map } from "../watch/core.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const watcher = watcher_map.get(input.watcher_id);
    if (!watcher) {
        log.println("watcher not found, ignore");
        return cb.ok({});
    }
    log.println("close watcher and remove");
    watcher_map.delete(input.watcher_id);
    watcher.close();
    return cb.ok({});
}
