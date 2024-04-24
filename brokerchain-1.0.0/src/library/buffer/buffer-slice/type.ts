// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    hex: string;
    byte_start: number;
    byte_end: number;
}

export interface OutputEmpty {
    sliced_hex: string;
}

export interface OutputOk {
    sliced_hex: string;
}

export interface OutputFail {}

export interface Callback<R> {
    empty: (output: OutputEmpty) => R;
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
            if (field === "hex") return;
            if (field === "byte_start") return;
            if (field === "byte_end") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.hex must be string");
        if (typeof v.hex !== "string") {
            throw new Error("v.hex is not string");
        }

        log.println("v.byte_start must be number");
        if (typeof v.byte_start !== "number") {
            throw new Error("v.byte_start is not number");
        }

        if (Number.isFinite(v.byte_start) === false) {
            throw new Error("v.byte_start is not finite number");
        }

        log.println("v.byte_end must be number");
        if (typeof v.byte_end !== "number") {
            throw new Error("v.byte_end is not number");
        }

        if (Number.isFinite(v.byte_end) === false) {
            throw new Error("v.byte_end is not finite number");
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
export function copy_output_empty(v: any): OutputEmpty {
    if (v !== undefined) {
        const v_cloned = JSON.parse(JSON.stringify(v));
        return _copy_output_empty(v_cloned);
    } else {
        return _copy_output_empty(v);
    }
}

export function _copy_output_empty(v: any): OutputEmpty {
    if (typeof v === "object" && v !== null) {
        const obj = {
            sliced_hex: copy_sliced_hex(v.sliced_hex)
        };
        return obj;
    } else {
        return { sliced_hex: "" };
    }

    function copy_sliced_hex(v: any): string {
        return typeof v === "string" ? v : "";
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
            sliced_hex: copy_sliced_hex(v.sliced_hex)
        };
        return obj;
    } else {
        return { sliced_hex: "" };
    }

    function copy_sliced_hex(v: any): string {
        return typeof v === "string" ? v : "";
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
