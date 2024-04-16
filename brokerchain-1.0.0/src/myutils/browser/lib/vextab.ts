import { Logger } from "../../logger.js";
import * as dom from "../dom.js";
interface Callback<R> {
    ok: (katex: any) => R;
    fail: (err: Error) => R;
}
type Listener = (ok: boolean) => void;
type State = "none" | "loading" | "loaded" | "error";
let state: State = "none";
let error: Error | null = null;
let listeners: Listener[] = [];
let vextab: any = null;
export function load<R>(plog: Logger, cb: Callback<R>): Promise<R> {
    const log = plog.sub("lib.vextab.load");
    return new Promise<R>((resolve) => {
        if (state === "loaded") {
            log.println("loaded already, return immediately");
            const ret = cb.ok(vextab);
            resolve(ret);
            return;
        }
        if (state === "error") {
            log.println("load failed, return error");
            const ret = cb.fail(error);
            resolve(ret);
            return;
        }
        const listener: Listener = (ok) => {
            log.println("listener invoked, load " + (ok ? "ok" : "failed"));
            const ret = ok ? cb.ok(vextab) : cb.fail(vextab);
            resolve(ret);
        };
        if (state === "loading") {
            log.println("loading already, push to listener list");
            listeners.push(listener);
            return;
        }
        log.println("load now, push to listener list");
        listeners.push(listener);
        state = "loading";
        load_assets(log)
            .then(() => {
                state = "loaded";
                vextab = (window as any).katex;
                log.println("tell every listener success");
                listeners.forEach((cb) => {
                    cb(true);
                });
                listeners = [];
            })
            .catch((err) => {
                state = "error";
                error = err;
                log.println("tell every listener failed");
                listeners.forEach((cb) => {
                    cb(false);
                });
                listeners = [];
            });
    });
}
async function load_assets(log: Logger) {
    await dom.add_script(log, "/vextab/main.prod.js", {
        ok: () => {
            // ignore
        },
        fail: (err) => {
            throw err;
        }
    });
}
