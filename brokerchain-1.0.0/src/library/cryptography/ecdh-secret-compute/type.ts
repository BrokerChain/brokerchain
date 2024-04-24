// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    curve_name:
        | "Oakley-EC2N-3"
        | "Oakley-EC2N-4"
        | "SM2"
        | "brainpoolP160r1"
        | "brainpoolP160t1"
        | "brainpoolP192r1"
        | "brainpoolP192t1"
        | "brainpoolP224r1"
        | "brainpoolP224t1"
        | "brainpoolP256r1"
        | "brainpoolP256t1"
        | "brainpoolP320r1"
        | "brainpoolP320t1"
        | "brainpoolP384r1"
        | "brainpoolP384t1"
        | "brainpoolP512r1"
        | "brainpoolP512t1"
        | "c2pnb163v1"
        | "c2pnb163v2"
        | "c2pnb163v3"
        | "c2pnb176v1"
        | "c2pnb208w1"
        | "c2pnb272w1"
        | "c2pnb304w1"
        | "c2pnb368w1"
        | "c2tnb191v1"
        | "c2tnb191v2"
        | "c2tnb191v3"
        | "c2tnb239v1"
        | "c2tnb239v2"
        | "c2tnb239v3"
        | "c2tnb359v1"
        | "c2tnb431r1"
        | "prime192v1"
        | "prime192v2"
        | "prime192v3"
        | "prime239v1"
        | "prime239v2"
        | "prime239v3"
        | "prime256v1"
        | "secp112r1"
        | "secp112r2"
        | "secp128r1"
        | "secp128r2"
        | "secp160k1"
        | "secp160r1"
        | "secp160r2"
        | "secp192k1"
        | "secp224k1"
        | "secp224r1"
        | "secp256k1"
        | "secp384r1"
        | "secp521r1"
        | "sect113r1"
        | "sect113r2"
        | "sect131r1"
        | "sect131r2"
        | "sect163k1"
        | "sect163r1"
        | "sect163r2"
        | "sect193r1"
        | "sect193r2"
        | "sect233k1"
        | "sect233r1"
        | "sect239k1"
        | "sect283k1"
        | "sect283r1"
        | "sect409k1"
        | "sect409r1"
        | "sect571k1"
        | "sect571r1"
        | "wap-wsg-idm-ecid-wtls1"
        | "wap-wsg-idm-ecid-wtls10"
        | "wap-wsg-idm-ecid-wtls11"
        | "wap-wsg-idm-ecid-wtls12"
        | "wap-wsg-idm-ecid-wtls3"
        | "wap-wsg-idm-ecid-wtls4"
        | "wap-wsg-idm-ecid-wtls5"
        | "wap-wsg-idm-ecid-wtls6"
        | "wap-wsg-idm-ecid-wtls7"
        | "wap-wsg-idm-ecid-wtls8"
        | "wap-wsg-idm-ecid-wtls9";
    my_private_key_hex: string;
    target_public_key_hex: string;
}

export interface OutputOk {
    secret: { hex: string; base64: string };
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
            if (field === "curve_name") return;
            if (field === "my_private_key_hex") return;
            if (field === "target_public_key_hex") return;
            throw new Error("v contains unknown field: " + field);
        });

        log.println("v.curve_name must be string");
        if (typeof v.curve_name !== "string") {
            throw new Error("v.curve_name is not string");
        }

        if (
            new Set([
                "Oakley-EC2N-3",
                "Oakley-EC2N-4",
                "SM2",
                "brainpoolP160r1",
                "brainpoolP160t1",
                "brainpoolP192r1",
                "brainpoolP192t1",
                "brainpoolP224r1",
                "brainpoolP224t1",
                "brainpoolP256r1",
                "brainpoolP256t1",
                "brainpoolP320r1",
                "brainpoolP320t1",
                "brainpoolP384r1",
                "brainpoolP384t1",
                "brainpoolP512r1",
                "brainpoolP512t1",
                "c2pnb163v1",
                "c2pnb163v2",
                "c2pnb163v3",
                "c2pnb176v1",
                "c2pnb208w1",
                "c2pnb272w1",
                "c2pnb304w1",
                "c2pnb368w1",
                "c2tnb191v1",
                "c2tnb191v2",
                "c2tnb191v3",
                "c2tnb239v1",
                "c2tnb239v2",
                "c2tnb239v3",
                "c2tnb359v1",
                "c2tnb431r1",
                "prime192v1",
                "prime192v2",
                "prime192v3",
                "prime239v1",
                "prime239v2",
                "prime239v3",
                "prime256v1",
                "secp112r1",
                "secp112r2",
                "secp128r1",
                "secp128r2",
                "secp160k1",
                "secp160r1",
                "secp160r2",
                "secp192k1",
                "secp224k1",
                "secp224r1",
                "secp256k1",
                "secp384r1",
                "secp521r1",
                "sect113r1",
                "sect113r2",
                "sect131r1",
                "sect131r2",
                "sect163k1",
                "sect163r1",
                "sect163r2",
                "sect193r1",
                "sect193r2",
                "sect233k1",
                "sect233r1",
                "sect239k1",
                "sect283k1",
                "sect283r1",
                "sect409k1",
                "sect409r1",
                "sect571k1",
                "sect571r1",
                "wap-wsg-idm-ecid-wtls1",
                "wap-wsg-idm-ecid-wtls10",
                "wap-wsg-idm-ecid-wtls11",
                "wap-wsg-idm-ecid-wtls12",
                "wap-wsg-idm-ecid-wtls3",
                "wap-wsg-idm-ecid-wtls4",
                "wap-wsg-idm-ecid-wtls5",
                "wap-wsg-idm-ecid-wtls6",
                "wap-wsg-idm-ecid-wtls7",
                "wap-wsg-idm-ecid-wtls8",
                "wap-wsg-idm-ecid-wtls9"
            ]).has(v.curve_name) === false
        ) {
            throw new Error("v.curve_name is not a valid string enum value");
        }

        log.println("v.my_private_key_hex must be string");
        if (typeof v.my_private_key_hex !== "string") {
            throw new Error("v.my_private_key_hex is not string");
        }

        log.println("v.target_public_key_hex must be string");
        if (typeof v.target_public_key_hex !== "string") {
            throw new Error("v.target_public_key_hex is not string");
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
            secret: copy_secret(v.secret)
        };
        return obj;
    } else {
        return { secret: { hex: "", base64: "" } };
    }

    function copy_secret(v: any): { hex: string; base64: string } {
        if (typeof v === "object" && v !== null) {
            const obj = {
                hex: copy_hex(v.hex),
                base64: copy_base64(v.base64)
            };
            return obj;
        } else {
            return { hex: "", base64: "" };
        }

        function copy_hex(v: any): string {
            return typeof v === "string" ? v : "";
        }

        function copy_base64(v: any): string {
            return typeof v === "string" ? v : "";
        }
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
