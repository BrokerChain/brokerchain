import { Logger } from "../../logger.js";
import * as fs from "node:fs";
interface Callback<R> {
    ok: (watcher: Watcher) => R;
    fail: (err: Error) => R;
}
// WANING this function only works on Windows/macOS, not Linux
export function fs_change<R>(
    plog: Logger,
    opts: {
        path: string;
    },
    cb: Callback<R>
) {
    const log = plog.sub("fs_change");
    log.variable("path", opts.path);
    log.warn("fix this implementation");
    // FIXME
    // always ok at this moment
    // I don't known when will it fail
    // see https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_fswatcher
    const obj = new Watcher(log, opts.path);
    return cb.ok(obj);
}
type ChangeListener = (type: string, filename: string) => void;
type CloseListener = () => void;
class Watcher {
    _w: fs.FSWatcher;
    _change_listeners: ChangeListener[];
    _close_listeners: CloseListener[];
    constructor(log: Logger, path: string) {
        this._change_listeners = [];
        this._close_listeners = [];
        log.println("begin watch");
        const w = (this._w = fs.watch(path, {
            // default: false
            // WARNING not works on linux
            // see https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_watch_filename_options_listener
            recursive: true
        }));
        w.on("change", (type, filename) => {
            log.println("change");
            log.variable("type", type);
            log.variable("filename", filename);
            // FIXME what if filename is buffer?
            this.notify_change(type, filename.toString());
        });
        // FIXME when will this happen?
        w.once("error", (err) => {
            log.error(err);
            // always treat error as close
            // but will this be called mutiple times?
            this.notify_close();
        });
        w.once("close", () => {
            this.notify_close();
        });
    }
    on_change(listener: ChangeListener) {
        this._change_listeners.push(listener);
        return {
            remove: () => {
                this._change_listeners = this._change_listeners.filter((item) => item !== listener);
            }
        };
    }
    on_close(listener: CloseListener) {
        this._close_listeners.push(listener);
        return {
            remove: () => {
                this._close_listeners = this._close_listeners.filter((item) => item !== listener);
            }
        };
    }
    close() {
        this._w.close();
    }
    private notify_close() {
        this._close_listeners.forEach((f) => {
            f();
        });
        // never notify close again
        this._close_listeners = [];
    }
    private notify_change(type: string, filename: string) {
        this._change_listeners.forEach((f) => {
            f(type, filename);
        });
    }
}
