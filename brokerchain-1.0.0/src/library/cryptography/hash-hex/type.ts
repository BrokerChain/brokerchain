// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    algorithm:
        | "RSA-MD5"
        | "RSA-RIPEMD160"
        | "RSA-SHA1"
        | "RSA-SHA1-2"
        | "RSA-SHA224"
        | "RSA-SHA256"
        | "RSA-SHA3-224"
        | "RSA-SHA3-256"
        | "RSA-SHA3-384"
        | "RSA-SHA3-512"
        | "RSA-SHA384"
        | "RSA-SHA512"
        | "RSA-SHA512/224"
        | "RSA-SHA512/256"
        | "RSA-SM3"
        | "blake2b512"
        | "blake2s256"
        | "id-rsassa-pkcs1-v1_5-with-sha3-224"
        | "id-rsassa-pkcs1-v1_5-with-sha3-256"
        | "id-rsassa-pkcs1-v1_5-with-sha3-384"
        | "id-rsassa-pkcs1-v1_5-with-sha3-512"
        | "md5"
        | "md5-sha1"
        | "md5WithRSAEncryption"
        | "ripemd"
        | "ripemd160"
        | "ripemd160WithRSA"
        | "rmd160"
        | "sha1"
        | "sha1WithRSAEncryption"
        | "sha224"
        | "sha224WithRSAEncryption"
        | "sha256"
        | "sha256WithRSAEncryption"
        | "sha3-224"
        | "sha3-256"
        | "sha3-384"
        | "sha3-512"
        | "sha384"
        | "sha384WithRSAEncryption"
        | "sha512"
        | "sha512-224"
        | "sha512-224WithRSAEncryption"
        | "sha512-256"
        | "sha512-256WithRSAEncryption"
        | "sha512WithRSAEncryption"
        | "shake128"
        | "shake256"
        | "sm3"
        | "sm3WithRSAEncryption"
        | "ssl3-md5"
        | "ssl3-sha1";
    content_hex: string;
}

export interface OutputOk {
    result_hex: string;
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
            if (field === "algorithm") return;
            if (field === "content_hex") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.algorithm must be string");
        if (typeof v.algorithm !== "string") {
            throw new Error("v.algorithm is not string");
        }

        if (
            new Set([
                "RSA-MD5",
                "RSA-RIPEMD160",
                "RSA-SHA1",
                "RSA-SHA1-2",
                "RSA-SHA224",
                "RSA-SHA256",
                "RSA-SHA3-224",
                "RSA-SHA3-256",
                "RSA-SHA3-384",
                "RSA-SHA3-512",
                "RSA-SHA384",
                "RSA-SHA512",
                "RSA-SHA512/224",
                "RSA-SHA512/256",
                "RSA-SM3",
                "blake2b512",
                "blake2s256",
                "id-rsassa-pkcs1-v1_5-with-sha3-224",
                "id-rsassa-pkcs1-v1_5-with-sha3-256",
                "id-rsassa-pkcs1-v1_5-with-sha3-384",
                "id-rsassa-pkcs1-v1_5-with-sha3-512",
                "md5",
                "md5-sha1",
                "md5WithRSAEncryption",
                "ripemd",
                "ripemd160",
                "ripemd160WithRSA",
                "rmd160",
                "sha1",
                "sha1WithRSAEncryption",
                "sha224",
                "sha224WithRSAEncryption",
                "sha256",
                "sha256WithRSAEncryption",
                "sha3-224",
                "sha3-256",
                "sha3-384",
                "sha3-512",
                "sha384",
                "sha384WithRSAEncryption",
                "sha512",
                "sha512-224",
                "sha512-224WithRSAEncryption",
                "sha512-256",
                "sha512-256WithRSAEncryption",
                "sha512WithRSAEncryption",
                "shake128",
                "shake256",
                "sm3",
                "sm3WithRSAEncryption",
                "ssl3-md5",
                "ssl3-sha1"
            ]).has(v.algorithm) === false
        ) {
            throw new Error("v.algorithm is not a valid string enum value");
        }

        log.println("v.content_hex must be string");
        if (typeof v.content_hex !== "string") {
            throw new Error("v.content_hex is not string");
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
            result_hex: copy_result_hex(v.result_hex)
        };
        return obj;
    } else {
        return { result_hex: "" };
    }

    function copy_result_hex(v: any): string {
        return typeof v === "string" ? v : "";
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
