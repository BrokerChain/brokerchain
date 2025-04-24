import { Checker, checker } from "./common/check.js";

const is_browser = typeof window !== "undefined";

const browser_color = {
    blue: "rgb(138, 180, 248)",
    red: "rgb(242, 139, 130)",
    yellow: "yellow"
};

let logger_disabled = false;

export function set_logger_disabled(v: boolean) {
    logger_disabled = v;
}

function is_enabled(logger: Logger) {
    if (logger_disabled) return false; // gloabl setting
    return logger.enabled;
}

type HookFun = (o: Logger) => void;

interface Hook {
    id: number;
    fun: HookFun;
}

class HookStack {
    static _next_id = 0;
    hook_list: Hook[] = [];

    push(fun: HookFun) {
        const item: Hook = {
            id: HookStack._next_id,
            fun
        };
        HookStack._next_id += 1;
        this.hook_list.push(item);
        return item.id;
    }

    // use id to help detect the bugs
    remove(id: number) {
        this.hook_list = this.hook_list.filter((item) => item.id !== id);
    }

    call(o: Logger) {
        if (this.hook_list.length < 1) {
            // ignore
            return;
        } else {
            // apply it
            this.hook_list[this.hook_list.length - 1].fun(o);
        }
    }
}

export class Logger {
    name: string;
    children: Map<string, Logger>; // FIXME memory leaks? change to weakmap maybe
    children_count: number;
    enabled: boolean;

    // What is this?
    // - You can use this feature to hook the `new Logger()` operation.
    // Why do we need this?
    // - To fix some parent-child relationships.
    // - For example, when you use `import()` to dynamically load some code,
    //   you can't pass the log object to let the newly loaded code know who its parent logger is.
    // - So, you can add a hook here to fix it.
    // Who uses this feature?
    // - This feature is very useful for `load_library()`. Check its code to learn more.
    // Why is this a stack, not a single function?
    // - To handle recursion properly.
    static new_hook_stack = new HookStack();

    constructor(name: string) {
        this.name = name;
        this.children = new Map<string, Logger>();
        this.children_count = 0;
        this.enabled = true;

        // only invoke new hook when this logger has no parent
        if (!this.has_parent()) {
            Logger.new_hook_stack.call(this);
        }
    }

    has_parent() {
        return this.name.indexOf("/") !== -1;
    }

    enable(v: boolean) {
        this.enabled = v;
        // recursive
        this.children.forEach((item) => {
            item.enable(v);
        });
        return this;
    }

    async action<T = any>(name: string, exp: () => Promise<T>): Promise<T> {
        this.println(name);
        try {
            const ret = await exp();
            this.println(name + " ok");
            return ret;
        } catch (err) {
            // this.error(err);
            this.println(name + " fail");
            throw err;
        }
    }

    println(...args: any[]) {
        if (!is_enabled(this)) {
            return;
        }
        const str = all_to_string(args);
        if (is_browser) {
            console.log("%c%s %c%s", `color:${browser_color.blue}`, `[${this.name}]`, "color:inherit", str);
        } else {
            console.log(`${blue(`[${this.name}]`)} ${str}`);
        }
    }

    print_unknown_error(v: any) {
        if (!is_enabled(this)) {
            return;
        }
        if (typeof v === "object" && v !== null) {
            if (v.__created_by_logger) {
                // this error object is create by logger
                // and it must has been printed elsewhere
                return;
            }
        }
        this.error(v);
    }

    args(value: { [key: string]: any }) {
        if (!is_enabled(this)) {
            return;
        }
        this.println(`args=${JSON.stringify(value)}`);
    }

    condition(name: string, exp: () => boolean): boolean {
        let value = exp();
        if (!is_enabled(this)) {
            return value;
        }
        this.println(`${name}? ${value_to_str(value)}`);
        return value;
    }

    variable<T = any>(name: string, value: T, check?: (checker: Checker, value: any) => boolean): T {
        if (!is_enabled(this)) {
            return value;
        }
        this.println(`${name}=${value_to_str(value)}`);
        if (check) {
            if (!check(checker, value)) {
                this.throw("check fail");
            }
        }
        return value;
    }

    variable_debug<T = any>(name: string, value: T, check?: (checker: Checker, value: any) => boolean) {
        // TODO only display in debug environment
        return this.variable(name, value, check);
    }

    variable_secret<T = any>(name: string, value: T, check?: (checker: Checker, value: any) => boolean) {
        // TODO only display in debug environment
        return this.variable(name, value, check);
    }

    ok() {
        if (!is_enabled(this)) {
            return;
        }
        this.println("ok");
    }

    fail() {
        if (!is_enabled(this)) {
            return;
        }
        this.println("fail");
    }

    warn(...args: any[]) {
        if (!is_enabled(this)) {
            return;
        }
        const str = all_to_string(args);
        if (is_browser) {
            console.log("%c%s %c%s", `color:${browser_color.blue}`, `[${this.name}]`, `color:${browser_color.yellow}`, str);
        } else {
            console.log(`${blue(`[${this.name}]`)} ${yellow("WARN")} ${str}`);
        }
    }

    error(...args: any[]) {
        if (!is_enabled(this)) {
            return;
        }
        const str = all_to_string(args);
        if (is_browser) {
            console.log("%c%s %c%s %c%s", `color:${browser_color.red}`, `[${this.name}]`, `color:${browser_color.yellow}`, "WARN", "color:inherit", str);
        } else {
            console.log(`${red(`[${this.name}]`)} ${yellow("WARN")} ${str}`);
        }
    }

    mark_known(error: any) {
        error.__created_by_logger = true; // important, mark it
        return error;
    }

    new_error(message: string): Error {
        const error = new Error(message);
        (error as any).__created_by_logger = true; // important, mark it
        this.error(error);
        return error;
    }

    throw(message: string): never {
        const error = new Error(message);
        this.error(error);
        throw error;
    }

    sub(name: string) {
        const enc = encodeURIComponent;
        const child_name = `${this.name}/${enc(name)}`;
        let target = this.children.get(child_name);
        if (target) {
            return target;
        } else {
            this.children_count += 1;
            const item = new Logger(child_name);
            item.enabled = this.enabled;
            return item;
        }
    }

    sub_next() {
        return this.sub(this.children_count.toString());
    }

    sub_library_function(library_name: string, function_name: string) {
        const enc = encodeURIComponent;
        const child_name = `${this.name}/${enc(library_name)}.${enc(function_name)}`;
        let target = this.children.get(child_name);
        if (target) {
            return target;
        } else {
            this.children_count += 1;
            const item = new Logger(child_name);
            item.enabled = this.enabled ? get_library_function_enabled(library_name, function_name) : false;
            return item;
        }
    }
}

function get_library_function_enabled(library_name: string, function_name: string) {
    // FIXME hardcoded library pattern here
    // should use a dynamic table later to allow user
    // enable / disable library logger at runtime
    if (/^x-.*-store$/.test(library_name)) {
        return false;
    } else {
        return true;
    }
}

function all_to_string(items: any[]) {
    return items.map(String).join("");
}

function parse_name(name: string): string[] {
    if (!name) return [];
    return name.split("/").map((item) => decodeURIComponent(item));
}

function red(text: any) {
    return "\u001B[34m" + text + "\u001B[0m";
}

function blue(text: any) {
    return "\u001B[34m" + text + "\u001B[0m";
}

function yellow(text: any) {
    return "\u001B[33m" + text + "\u001B[0m";
}

function value_to_str(value: any) {
    let str = "";
    if (value === undefined) {
        str = "undefined";
    } else if (value === null) {
        str = "null";
    } else if (typeof value === "number") {
        str = value.toString();
    } else if (typeof value === "boolean") {
        str = value ? "true" : "false";
    } else if (typeof value === "string") {
        str = JSON.stringify(value);
    } else if (typeof value === "object") {
        str = JSON.stringify(value, null, 4);
    } else {
        console.error(value);
        throw new Error("unknwon value type");
    }
    return str;
}
