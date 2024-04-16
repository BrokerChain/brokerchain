import { Logger } from "../../../../../myutils/logger.js";
import * as t from "../type/index.js";
const cache: {
    [key: string]: {
        [key: string]: t.Collection<any>;
    };
} = {};
// export function debug() {
//     debugger;
//     console.log("cache.debug");
//     console.log(JSON.stringify(cache, null, 4));
// }
export function get<R>(
    plog: Logger,
    opts: {
        namespace: string;
        key: string;
    },
    cb: {
        ok: (value: t.Collection<any>) => R;
        not_found: () => R;
    }
): R {
    const log = plog.sub("cache.get");
    const { namespace, key } = opts;
    log.variable("namespace", namespace);
    log.variable("key", key);
    const v = cache[namespace] && cache[namespace][key];
    if (v) {
        log.ok();
        return cb.ok(v);
    } else {
        log.println("not found");
        return cb.not_found();
    }
}
export function set(
    plog: Logger,
    opts: {
        namespace: string;
        key: string;
    },
    coll: t.Collection<any>
) {
    const log = plog.sub("cache.set");
    const { namespace, key } = opts;
    log.variable("namespace", namespace);
    log.variable("key", key);
    if (!cache[namespace]) {
        cache[namespace] = {
            [key]: coll
        };
    } else {
        cache[namespace][key] = coll;
    }
}
