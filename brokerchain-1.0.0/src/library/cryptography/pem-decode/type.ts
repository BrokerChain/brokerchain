// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    text: string;
}

export interface OutputOk {
    list: { type: string; content: string }[];
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
            if (field === "text") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.text must be string");
        if (typeof v.text !== "string") {
            throw new Error("v.text is not string");
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
            list: copy_list(v.list)
        };
        return obj;
    } else {
        return { list: [] };
    }

    function copy_list(v: any): { type: string; content: string }[] {
        return Array.isArray(v) ? v.map(copy_item) : [];

        function copy_item(v: any): { type: string; content: string } {
            if (typeof v === "object" && v !== null) {
                const obj = {
                    type: copy_type(v.type),
                    content: copy_content(v.content)
                };
                return obj;
            } else {
                return { type: "", content: "" };
            }

            function copy_type(v: any): string {
                return typeof v === "string" ? v : "";
            }

            function copy_content(v: any): string {
                return typeof v === "string" ? v : "";
            }
        }
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
