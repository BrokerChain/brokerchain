import { Validator } from "./index.js";
const any: Validator<any> = (v, refuse) => {
    return true;
};
const required: Validator<any> = (v, refuse) => {
    if (v === undefined || v === null || v === "") {
        refuse.reason("empty");
        return false;
    }
    return true;
};
const optional = (validator: Validator<any>) => {
    const fun: Validator<any> = (v, refuse) => {
        if (v === "" || v === undefined || v === null) {
            return true;
        }
        return validator(v, refuse);
    };
    return fun;
};
const id: Validator<string> = (v, refuse) => {
    if (!v) {
        refuse.reason("empty");
        return false;
    }
    if (/^[a-zA-Z0-9-_]+$/.test(v) === false) {
        refuse.reason("invalid-format");
        return false;
    }
    // TODO more
    return true;
};
const name: Validator<string> = (v, refuse) => {
    if (!v) {
        refuse.reason("empty");
        return false;
    }
    // allow middle space, but refuse head or tail spaces
    if (v.trim() !== v) {
        refuse.reason("invalid-format");
        return false;
    }
    // TODO more
    // - emoji
    // - number
    // - special characters
    return true;
};
const age: Validator<number> = (v, refuse) => {
    if (v === undefined || v === null) {
        refuse.reason("empty");
        return false;
    }
    if (!Number.isSafeInteger(v)) {
        refuse.reason("invalid-format");
        return false;
    }
    // valid range: [0, 140]
    if (v < 0 || v > 140) {
        refuse.reason("invalid-format");
        return false;
    }
    return true;
};
const birthday: Validator<string> = (v, refuse) => {
    if (!v) {
        refuse.reason("empty");
        return false;
    }
    const ms = Date.parse(v);
    if (!Number.isSafeInteger(ms)) {
        refuse.reason("invalid-format");
        return false;
    }
    const now = Date.now();
    const delta = now - ms;
    // valid age range: [0, 140]
    if (delta < 0 || delta > 140 * 365 * 24 * 60 * 60 * 1000) {
        refuse.reason("invalid-format");
        return false;
    }
    // TODO more
    return true;
};
const tel: Validator<string> = (v, refuse) => {
    if (!v || !v.trim()) {
        refuse.reason("empty");
        return false;
    }
    // support china mainland mobile phone number only
    // TODO support more
    if (/^\d{11}$/.test(v) === false) {
        refuse.reason("invalid-format");
        return false;
    }
    // TODO more
    return true;
};
const gender: Validator<string> = (v, refuse) => {
    if (!v) {
        refuse.reason("empty");
        return false;
    }
    if (v !== "male" && v !== "female") {
        refuse.reason("invalid-format");
        return false;
    }
    // TODO more
    return true;
};
const id_card: Validator<string> = (v, refuse) => {
    if (!v) {
        refuse.reason("empty");
        return false;
    }
    if (v.length !== 18) {
        refuse.reason("invalid-format");
        return false;
    }
    if (/^\d{17}[0-9xX]$/.test(v) === false) {
        refuse.reason("invalid-format");
        return false;
    }
    // TODO more
    return true;
};
export const validator = {
    any,
    required,
    optional,
    id,
    id_card,
    name,
    age,
    birthday,
    tel,
    gender
};
