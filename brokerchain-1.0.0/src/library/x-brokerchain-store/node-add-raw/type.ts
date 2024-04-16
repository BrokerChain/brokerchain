// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    node: { fake?: boolean; create_time: string; update_time: string };
}

export interface OutputOk {
    id: string;
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
            if (field === "node") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.node must be object");
        if (typeof v.node !== "object" || v.node === null) {
            throw new Error("v.node is not object");
        }

        Object.keys(v.node).forEach((field) => {
            if (field === "fake") return;
            if (field === "create_time") return;
            if (field === "update_time") return;
            throw new Error("v.node contains unknown field: " + field);
        });

        if (v.node.fake !== undefined) {
            log.println("v.node.fake must be boolean");
            if (typeof v.node.fake !== "boolean") {
                throw new Error("v.node.fake is not boolean");
            }
        }

        log.println("v.node.create_time must be string");
        if (typeof v.node.create_time !== "string") {
            throw new Error("v.node.create_time is not string");
        }

        if (v.node.create_time !== "" && Number.isNaN(Date.parse(v.node.create_time))) {
            throw new Error("v.node.create_time is not a valid datetime string");
        }

        log.println("v.node.update_time must be string");
        if (typeof v.node.update_time !== "string") {
            throw new Error("v.node.update_time is not string");
        }

        if (v.node.update_time !== "" && Number.isNaN(Date.parse(v.node.update_time))) {
            throw new Error("v.node.update_time is not a valid datetime string");
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
            id: copy_id(v.id)
        };
        return obj;
    } else {
        return { id: "" };
    }

    function copy_id(v: any): string {
        return typeof v === "string" ? v : "";
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;