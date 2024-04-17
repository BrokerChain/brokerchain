// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    root_dir: string;
    entry_html_list?: { name: string; path: string }[];
    tailwindcss?: { [key: string]: any };
    out_dir: string;
    empty_out_dir?: boolean;
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
            if (field === "root_dir") return;
            if (field === "entry_html_list") return;
            if (field === "tailwindcss") return;
            if (field === "out_dir") return;
            if (field === "empty_out_dir") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.root_dir must be string");
        if (typeof v.root_dir !== "string") {
            throw new Error("v.root_dir is not string");
        }

        if (v.entry_html_list !== undefined) {
            log.println("v.entry_html_list must be array");
            if (!Array.isArray(v.entry_html_list)) {
                throw new Error("v.entry_html_list is not array");
            }

            v.entry_html_list.forEach((item: any, i: number) => {
                log.println("check v.entry_html_list[i]");

                log.println("item must be object");
                if (typeof item !== "object" || item === null) {
                    throw new Error("item is not object");
                }

                Object.keys(item).forEach((field) => {
                    if (field === "name") return;
                    if (field === "path") return;
                    throw new Error("item contains unknown field: " + field);
                });

                log.println("item.name must be string");
                if (typeof item.name !== "string") {
                    throw new Error("item.name is not string");
                }

                log.println("item.path must be string");
                if (typeof item.path !== "string") {
                    throw new Error("item.path is not string");
                }
            });
        }

        if (v.tailwindcss !== undefined) {
            log.println("v.tailwindcss must be object");
            if (typeof v.tailwindcss !== "object" || v.tailwindcss === null) {
                throw new Error("v.tailwindcss is not object");
            }

            Object.keys(v.tailwindcss).forEach((field) => {
                // a dynamic field, check it (FIXME log message is not clear)

                log.println("v.tailwindcss.field must be any (ignore)");
            });
        }

        log.println("v.out_dir must be string");
        if (typeof v.out_dir !== "string") {
            throw new Error("v.out_dir is not string");
        }

        if (v.empty_out_dir !== undefined) {
            log.println("v.empty_out_dir must be boolean");
            if (typeof v.empty_out_dir !== "boolean") {
                throw new Error("v.empty_out_dir is not boolean");
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
        const obj = {};
        return obj;
    } else {
        return {};
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
