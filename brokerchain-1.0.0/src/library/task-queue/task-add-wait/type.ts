// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    queue_id: string;
}

export interface OutputOk {
    task_id: string;
}

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
            if (field === "queue_id") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.queue_id must be string");
        if (typeof v.queue_id !== "string") {
            throw new Error("v.queue_id is not string");
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
        const obj = {
            task_id: copy_task_id(v.task_id)
        };
        return obj;
    } else {
        return { task_id: "" };
    }

    function copy_task_id(v: any): string {
        return typeof v === "string" ? v : "";
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
