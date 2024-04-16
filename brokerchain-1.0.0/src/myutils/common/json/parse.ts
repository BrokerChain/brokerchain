import { Logger } from "../../logger.js";
interface Callback<T, R> {
    ok: (v: T) => R;
    fail: (err: Error) => R;
}
export function parse<T = any, R = any>(
    plog: Logger,
    input: {
        text: string;
        check: (v: T) => string;
    },
    cb: Callback<T, R>
): R {
    const log = plog.sub("json.parse");
    try {
        const v = JSON.parse(input.text);
        log.println("parse ok");
        try {
            var reason = input.check(v);
        } catch (err) {
            log.warn("internal error from check function");
            log.error(err);
            return cb.fail(err);
        }
        if (!reason) {
            return cb.ok(v);
        } else {
            const err = new Error("check failed: " + reason);
            log.error(err);
            return cb.fail(err);
        }
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
}
