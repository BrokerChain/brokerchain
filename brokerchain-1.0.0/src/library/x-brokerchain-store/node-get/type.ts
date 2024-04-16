// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    id: string;
}

export interface OutputNone {
    node: { id: string; fake?: boolean; create_time: string; update_time: string };
}

export interface OutputOk {
    node: { id: string; fake?: boolean; create_time: string; update_time: string };
}

export interface OutputFail {}

export interface Callback<R> {
    none: (output: OutputNone) => R;
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
            if (field === "id") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.id must be string");
        if (typeof v.id !== "string") {
            throw new Error("v.id is not string");
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
export function copy_output_none(v: any): OutputNone {
    if (v !== undefined) {
        const v_cloned = JSON.parse(JSON.stringify(v));
        return _copy_output_none(v_cloned);
    } else {
        return _copy_output_none(v);
    }
}

export function _copy_output_none(v: any): OutputNone {
    if (typeof v === "object" && v !== null) {
        const obj = {
            node: copy_node(v.node)
        };
        return obj;
    } else {
        return { node: { id: "", create_time: "", update_time: "" } };
    }

    function copy_node(v: any): { id: string; fake?: boolean; create_time: string; update_time: string } {
        if (typeof v === "object" && v !== null) {
            const obj = {
                id: copy_id(v.id),
                fake: v.fake !== undefined && v.fake !== null ? copy_fake(v.fake) : undefined,
                create_time: copy_create_time(v.create_time),
                update_time: copy_update_time(v.update_time)
            };
            return obj;
        } else {
            return { id: "", create_time: "", update_time: "" };
        }

        function copy_id(v: any): string {
            return typeof v === "string" ? v : "";
        }

        function copy_fake(v: any): boolean {
            return typeof v === "boolean" ? v : false;
        }

        function copy_create_time(v: any): string {
            // empty datetime value is acceptable
            if (typeof v !== "string") {
                return "";
            } else {
                if (v === "") {
                    return v;
                } else if (Number.isNaN(Date.parse(v)) === false) {
                    return v;
                } else {
                    // invalid value, return empty string
                    return "";
                }
            }
        }

        function copy_update_time(v: any): string {
            // empty datetime value is acceptable
            if (typeof v !== "string") {
                return "";
            } else {
                if (v === "") {
                    return v;
                } else if (Number.isNaN(Date.parse(v)) === false) {
                    return v;
                } else {
                    // invalid value, return empty string
                    return "";
                }
            }
        }
    }
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
            node: copy_node(v.node)
        };
        return obj;
    } else {
        return { node: { id: "", create_time: "", update_time: "" } };
    }

    function copy_node(v: any): { id: string; fake?: boolean; create_time: string; update_time: string } {
        if (typeof v === "object" && v !== null) {
            const obj = {
                id: copy_id(v.id),
                fake: v.fake !== undefined && v.fake !== null ? copy_fake(v.fake) : undefined,
                create_time: copy_create_time(v.create_time),
                update_time: copy_update_time(v.update_time)
            };
            return obj;
        } else {
            return { id: "", create_time: "", update_time: "" };
        }

        function copy_id(v: any): string {
            return typeof v === "string" ? v : "";
        }

        function copy_fake(v: any): boolean {
            return typeof v === "boolean" ? v : false;
        }

        function copy_create_time(v: any): string {
            // empty datetime value is acceptable
            if (typeof v !== "string") {
                return "";
            } else {
                if (v === "") {
                    return v;
                } else if (Number.isNaN(Date.parse(v)) === false) {
                    return v;
                } else {
                    // invalid value, return empty string
                    return "";
                }
            }
        }

        function copy_update_time(v: any): string {
            // empty datetime value is acceptable
            if (typeof v !== "string") {
                return "";
            } else {
                if (v === "") {
                    return v;
                } else if (Number.isNaN(Date.parse(v)) === false) {
                    return v;
                } else {
                    // invalid value, return empty string
                    return "";
                }
            }
        }
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
