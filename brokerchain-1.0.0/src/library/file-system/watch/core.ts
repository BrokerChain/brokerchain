// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { guid } from "../../../myutils/common/guid.js";
import { Input, Output, Callback } from "./type.js";
import * as fs from "node:fs";

export const watcher_map = new Map<string, fs.FSWatcher>();

// [Note] https://nodejs.org/docs/latest/api/fs.html#caveats
// From nodejs official document:
// - The fs.watch API is not 100% consistent across platforms, and is unavailable in some situations.
// - On Windows, no events will be emitted if the watched directory is moved or renamed. An EPERM error is reported when the watched directory is deleted.
export async function core<R>(
    log: Logger,
    input: Input & {
        callback?: (event: "rename" | "change", path: string) => void;
    },
    cb: Callback<R>
): Promise<R> {
    const watcher = fs.watch(
        input.path,
        {
            persistent: input.persistent,
            recursive: input.recursive,
            encoding: input.encoding
        },
        (event, path) => {
            const e_log = log.sub_next();
            e_log.variable("event", event);
            e_log.variable("path", path);
            if (input.callback) {
                try {
                    input.callback(event, path);
                } catch (err) {
                    e_log.warn(err);
                }
            }
        }
    );

    const watcher_id = guid();
    watcher_map.set(watcher_id, watcher);

    return cb.ok({
        watcher_id
    });
}
