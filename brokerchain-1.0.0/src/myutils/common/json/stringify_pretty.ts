import { Logger } from "../../logger.js";
interface Callback<R> {
    ok: (v: string) => R;
    fail: (err: Error) => R;
}
export function stringify_pretty<R = any>(plog: Logger, target: any, cb: Callback<R>): R {
    const log = plog.sub("json.stringify_pretty");
    try {
        const text = JSON.stringify(target, null, 4); // READABLE
        log.ok();
        return cb.ok(text);
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
}
