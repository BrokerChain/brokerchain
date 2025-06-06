// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    path: string;
    persistent?: boolean;
    recursive?: boolean;
    encoding?: "ascii" | "utf8" | "utf-8" | "utf16le" | "utf-16le" | "ucs2" | "ucs-2" | "base64" | "base64url" | "latin1" | "binary" | "hex" | "buffer";
}

export interface OutputOk {
    watcher_id: string;
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
            if (field === "path") return;
            if (field === "persistent") return;
            if (field === "recursive") return;
            if (field === "encoding") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.path must be string");
        if (typeof v.path !== "string") {
            throw new Error("v.path is not string");
        }

        if (v.persistent !== undefined) {
            log.println("v.persistent must be boolean");
            if (typeof v.persistent !== "boolean") {
                throw new Error("v.persistent is not boolean");
            }
        }

        if (v.recursive !== undefined) {
            log.println("v.recursive must be boolean");
            if (typeof v.recursive !== "boolean") {
                throw new Error("v.recursive is not boolean");
            }
        }

        if (v.encoding !== undefined) {
            log.println("v.encoding must be string");
            if (typeof v.encoding !== "string") {
                throw new Error("v.encoding is not string");
            }

            if (
                new Set(["ascii", "utf8", "utf-8", "utf16le", "utf-16le", "ucs2", "ucs-2", "base64", "base64url", "latin1", "binary", "hex", "buffer"]).has(
                    v.encoding
                ) === false
            ) {
                throw new Error("v.encoding is not a valid string enum value");
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
            watcher_id: copy_watcher_id(v.watcher_id)
        };
        return obj;
    } else {
        return { watcher_id: "" };
    }

    function copy_watcher_id(v: any): string {
        return typeof v === "string" ? v : "";
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
