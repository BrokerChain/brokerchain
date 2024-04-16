// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    file: string;
    args: string[];
    text?: string;
    cwd?: string;
}

export interface OutputOk {
    exit_code: number;
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
            if (field === "file") return;
            if (field === "args") return;
            if (field === "text") return;
            if (field === "cwd") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.file must be string");
        if (typeof v.file !== "string") {
            throw new Error("v.file is not string");
        }

        log.println("v.args must be array");
        if (!Array.isArray(v.args)) {
            throw new Error("v.args is not array");
        }

        v.args.forEach((item: any, i: number) => {
            log.println("check v.args[i]");

            log.println("item must be string");
            if (typeof item !== "string") {
                throw new Error("item is not string");
            }
        });

        if (v.text !== undefined) {
            log.println("v.text must be string");
            if (typeof v.text !== "string") {
                throw new Error("v.text is not string");
            }
        }

        if (v.cwd !== undefined) {
            log.println("v.cwd must be string");
            if (typeof v.cwd !== "string") {
                throw new Error("v.cwd is not string");
            }
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
            exit_code: copy_exit_code(v.exit_code)
        };
        return obj;
    } else {
        return { exit_code: 0 };
    }

    function copy_exit_code(v: any): number {
        return typeof v === "number" ? v : 0;
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
