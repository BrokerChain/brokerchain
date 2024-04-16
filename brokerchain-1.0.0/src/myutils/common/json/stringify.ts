import { Logger } from "../../logger.js";
interface Callback<R> {
    ok: (v: string) => R;
    fail: (err: Error) => R;
}
export function stringify<R = any>(plog: Logger, target: any, cb: Callback<R>): R {
    const log = plog.sub("json.stringify");
    try {
        const text = JSON.stringify(target);
        log.ok();
        return cb.ok(text);
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
}
