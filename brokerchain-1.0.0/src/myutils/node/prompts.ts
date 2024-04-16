import prompts from "prompts";
import * as liburl from "node:url";
import * as fs from "node:fs";

export async function input_url_or_empty(name: string) {
    return input_url(name, { allow_empty: true });
}
export async function input_url(
    name: string,
    opt: {
        allow_empty: boolean;
    } = { allow_empty: false }
) {
    const result = await prompts(
        {
            type: "text",
            name,
            message: `${name}`,
            validate: (value: string) => {
                if (!value.length) {
                    if (opt.allow_empty) return true;
                    else return false;
                }
                const url = liburl.parse(value);
                // only http, https is acceptable
                return /^https?:$/i.test(url.protocol) && url.hostname ? true : false;
            }
        },
        { onCancel: on_cancel }
    );
    return result[name];
}
export async function input_boolean(name: string): Promise<boolean> {
    const result = await prompts(
        {
            type: "toggle",
            name,
            message: `${name}`,
            initial: false,
            active: "true",
            inactive: "false"
        },
        { onCancel: on_cancel }
    );
    return result[name];
}
export async function input_yes_no(name: string): Promise<boolean> {
    const result = await prompts(
        {
            type: "toggle",
            name,
            message: `${name}`,
            initial: false,
            active: "yes",
            inactive: "no"
        },
        { onCancel: on_cancel }
    );
    return result[name];
}
export async function input_string_or_empty(name: string) {
    return input_string(name, { allow_empty: true });
}
// allow special file input syntax:
// eg. "file://./a/b/c" means read file content /a/b/c as input value
export async function input_string(
    name: string,
    opt: {
        allow_empty: boolean;
        initial?: string;
    } = { allow_empty: false }
): Promise<string> {
    const result = await prompts(
        {
            type: "text",
            name,
            message: `${name}`,
            initial: opt.initial,
            validate
        },
        { onCancel: on_cancel }
    );
    const v: string = result[name];
    // dirty feature, support file read here to allow user input a text file
    // eg. input a pem key file (multiple lines of text)
    const url = liburl.parse(v);
    if (url.protocol === "file:" && url.host === ".") {
        const filename = url.pathname;
        const text = fs.readFileSync(filename, "utf-8");
        if (validate(text)) {
            return text;
        } else {
            throw new Error("invalid file content");
        }
    }
    return v;
    function validate(value: string) {
        if (!opt.allow_empty && value.length <= 0) return false;
        return true;
    }
}
export async function input_string_enum(name: string, items: string[], opt: {} = {}) {
    const result = await prompts(
        {
            type: "select",
            name,
            message: `${name}`,
            choices: items.map((item) => {
                return { title: item, value: item };
            }),
            initial: 0
        },
        { onCancel: on_cancel }
    );
    return result[name];
}
export async function input_number(
    name: string,
    opt: {
        validate: (value: number) => boolean;
    } = {
        validate: (value) => true
    }
): Promise<number> {
    const result = await prompts(
        {
            type: "number",
            name,
            message: `${name}`,
            initial: 0,
            validate: (value: number) => {
                if (Number.isNaN(value) || !Number.isFinite(value)) return false;
                return opt.validate(value);
            }
        },
        { onCancel: on_cancel }
    );
    return result[name];
}
export async function input_integer(
    name: string,
    opt: {
        validate: (value: number) => boolean;
    } = {
        validate: (value) => true
    }
): Promise<number> {
    const result = await prompts(
        {
            type: "number",
            name,
            message: `${name}`,
            initial: 0,
            validate: (value: number) => {
                if (!Number.isSafeInteger(value)) return false;
                return opt.validate(value);
            }
        },
        { onCancel: on_cancel }
    );
    return result[name];
}
export async function input_port(
    name: string,
    opt: {
        validate: (value: number) => boolean;
    } = {
        validate: (value) => true
    }
): Promise<number> {
    const result = await prompts(
        {
            type: "number",
            name,
            message: `${name}`,
            initial: 0,
            min: 0,
            max: 65535,
            validate: (value: number) => {
                if (!Number.isSafeInteger(value)) return false;
                // zero is ok, means random port
                if (value < 0 || value > 65535) return false;
                return opt.validate(value);
            }
        },
        { onCancel: on_cancel }
    );
    return result[name];
}
function on_cancel() {
    // never continue
    process.exit();
    return false;
}
function safe<T = any>(exp: () => T): T | undefined {
    try {
        return exp();
    } catch (err) {
        // ignore
        return undefined;
    }
}
