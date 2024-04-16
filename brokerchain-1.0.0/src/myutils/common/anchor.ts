import { Logger } from "../logger.js";
import * as json from "./json/index.js";
export interface Anchor {
    head_id: string;
    tail_id: string;
}
interface Callback<R> {
    none: () => R;
    ok: (anchor: Anchor) => R;
    fail: (err: Error) => R;
}
export function parse_anchor<R>(plog: Logger, input: string, cb: Callback<R>): R {
    const log = plog.sub("parse_anchor");
    log.variable("input", input);
    if (!input) {
        log.println("input is empty");
        return cb.none();
    }
    return json.parse(
        log,
        {
            text: input,
            check: (v) => {
                const ok = Array.isArray(v) && v.length === 2 && typeof v[0] === "string" && typeof v[1] === "string";
                return ok ? "" : "invalid anchor";
            }
        },
        {
            ok: (v: [head_id: string, tail_id: string]) => {
                let anchor: Anchor = { head_id: "", tail_id: "" };
                anchor.head_id = v[0];
                anchor.tail_id = v[1];
                log.variable("anchor", anchor);
                return cb.ok(anchor);
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
// there are two form of empty anchor:
// - "" simple empty string
// - ["",""] empty data
//
// this function returns simple empty string
export function make_empty_anchor(plog: Logger): string {
    const log = plog.sub("make_empty_anchor");
    // return make_anchor(log, { head_id: "", tail_id: "" });
    return "";
}
export function make_anchor(plog: Logger, input: Anchor): string {
    const log = plog.sub("make_anchor");
    log.variable("input", input);
    const output = JSON.stringify([input.head_id, input.tail_id]);
    log.variable("output", output);
    return output;
}
export function is_empty_anchor<R>(
    plog: Logger,
    v: Anchor,
    cb: {
        empty: (v: Anchor) => R;
        not_empty: (v: Anchor) => R;
    }
): R {
    const log = plog.sub("is_empty_anchor");
    const is_empty = v.head_id === "" && v.tail_id === "";
    log.variable("is_empty", is_empty);
    if (is_empty) {
        return cb.empty(v);
    } else {
        return cb.not_empty(v);
    }
}
