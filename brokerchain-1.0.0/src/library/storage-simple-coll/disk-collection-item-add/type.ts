// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    namespace: string;
    key: string;
    item: { id: string; [key: string]: any };
}

export interface OutputOk {}

export interface OutputFail {}

export interface Callback<R> {
    ok: (output: OutputOk) => R;
    fail: (err: Error) => R;
}

export function check_input<R>(plog: Logger, v: any, cb: { ok: () => R; fail: (err: Error) => R }): R {
    const log = plog.sub("check_input");
    log.variable("v", v);
    try {
        log.println("v must be object");
        if (typeof v !== "object" || v === null) {
            throw new Error("v is not object");
        }

        Object.keys(v).forEach((field) => {
            if (field === "namespace") return;
            if (field === "key") return;
            if (field === "item") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.namespace must be string");
        if (typeof v.namespace !== "string") {
            throw new Error("v.namespace is not string");
        }

        log.println("v.key must be string");
        if (typeof v.key !== "string") {
            throw new Error("v.key is not string");
        }

        log.println("v.item must be object");
        if (typeof v.item !== "object" || v.item === null) {
            throw new Error("v.item is not object");
        }

        Object.keys(v.item).forEach((field) => {
            if (field === "id") return;

            // a dynamic field, check it (FIXME log message is not clear)

            log.println("v.item.field must be any (ignore)");
        });

        log.println("v.item.id must be string");
        if (typeof v.item.id !== "string") {
            throw new Error("v.item.id is not string");
        }
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
    // nothing wrong
    log.ok();
    return cb.ok();
}

// JSON stringify value before copy to handle some specific problem
// eg. Date Object probelm
export function copy_output_ok(v: any): OutputOk {
    if (v !== undefined) {
        const v_cloned = JSON.parse(JSON.stringify(v));
        return _copy_output_ok(v_cloned);
    } else {
        return _copy_output_ok(v);
    }
}

export function _copy_output_ok(v: any): OutputOk {
    if (typeof v === "object" && v !== null) {
        const obj = {};
        return obj;
    } else {
        return {};
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;