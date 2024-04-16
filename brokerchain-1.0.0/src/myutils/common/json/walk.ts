import { Logger } from "../../logger.js";
// [NOTE]
// you can walk a json value and do some replace
// when you replace value1 to value2, the value2 will
// not be walked then, because we don't need this feature
interface Callback {
    undefined?: (v: undefined, replace: (v2: any) => void) => void;
    null?: (v: null, replace: (v2: any) => void) => void;
    boolean?: (v: boolean, replace: (v2: any) => void) => void;
    number?: (v: number, replace: (v2: any) => void) => void;
    string?: (v: string, replace: (v2: any) => void) => void;
    array?: (v: any[], replace: (v2: any) => void) => void;
    object?: (v: any, replace: (v2: any) => void) => void;
}
export function walk<T = any>(plog: Logger, value: T, cb: Callback): T {
    const log = plog.sub("json.walk");
    // log.variable_debug("value", value);
    let ret = value;
    walk_value(
        log,
        value,
        (new_value) => {
            // log.variable_debug("new_value", new_value);
            ret = new_value;
        },
        cb
    );
    // log.variable_debug("return", ret);
    return ret;
}
function walk_value(plog: Logger, value: any, replace_self: (new_value: any) => void, cb: Callback) {
    const log = plog.sub("walk_value");
    // log.variable_debug("value", value);
    const replace = (new_value: any) => {
        // ignore same value
        if (new_value === value) return;
        else replace_self(new_value);
    };
    if (value === undefined) {
        if (cb.undefined) cb.undefined(undefined, replace);
        return;
    }
    if (value === null) {
        if (cb.null) cb.null(null, replace);
        return;
    }
    switch (typeof value) {
        case "boolean":
            if (cb.boolean) cb.boolean(value, replace);
            break;
        case "number":
            if (cb.number) cb.number(value, replace);
            break;
        case "string":
            if (cb.string) cb.string(value, replace);
            break;
        case "object":
            if (Array.isArray(value)) {
                if (cb.array) cb.array(value, replace);
                value.forEach((item, i) => {
                    walk_value(
                        log.sub(`index.${i}`),
                        item,
                        (new_item) => {
                            value[i] = new_item;
                        },
                        cb
                    );
                });
            } else {
                if (cb.object) cb.object(value, replace);
                Object.keys(value).forEach((key) => {
                    walk_value(
                        log.sub(`props.${key}`),
                        value[key],
                        (new_value) => {
                            value[key] = new_value;
                        },
                        cb
                    );
                });
            }
            break;
        default:
            throw new Error("unsupported type: " + typeof value);
    }
}
// // test walk
// function test() {
//     const cb: Callback = {
//         undefined: () => {
//             console.log("undefined");
//         },
//         null: () => {
//             console.log("null");
//         },
//         boolean: (v: boolean) => {
//             console.log("boolean", v);
//         },
//         number: (v: number) => {
//             console.log("number", v);
//         },
//         string: (v: string) => {
//             console.log("string", v);
//         },
//         array: (v: any[]) => {
//             console.log("array", v);
//         },
//         object: (v: { [key: string]: any }) => {
//             console.log("object", v);
//         }
//     };
//     walk(new Logger("test-undefined"), undefined, cb);
//     walk(new Logger("test-null"), null, cb);
//     walk(new Logger("test-boolean"), true, cb);
//     walk(new Logger("test-number"), 123, cb);
//     walk(new Logger("test-string"), "hello", cb);
//     walk(new Logger("test-object"), { a: 1, b: 2 }, cb);
//     walk(new Logger("test-array"), ["x", "y"], cb);
// }
// test();
// // test replace
// function test1() {
//     const ret = walk(new Logger("test-undefined"), undefined, {
//         undefined: (v, replace) => {
//             replace(null);
//         }
//     });
//     console.log(ret);
// }
// function test2() {
//     const value = [
//         {
//             a: 100,
//             b: 200
//         },
//         "hello",
//         1234,
//         true
//     ];
//     const ret = walk(new Logger("test-object"), value, {
//         object: (v, replace) => {
//             replace({
//                 id: 1
//             });
//         }
//     });
//     console.log(ret);
// }
// test2();
