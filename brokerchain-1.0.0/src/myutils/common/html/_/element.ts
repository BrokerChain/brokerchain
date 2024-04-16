import { Logger } from "../../../logger.js";
import { Output } from "./output.js";
let _next_id = 0;
export class Element {
    _id: string = ""; // global unique
    _export_name: string = ""; // export code name (optional)
    _name: string = "";
    _attribute = new Map<string, string | null>(); // null value means only atrribute name are generated (eg. "defer" in <script defer></script>)
    _children: Element[] = [];
    _tag_omission: boolean = false;
    constructor(name: string) {
        this._id = next_id();
        this._name = name;
    }
    id(v: string) {
        this._id = v;
        return this;
    }
    attr_id(v: string) {
        this._attribute.set("id", v);
        return this;
    }
    attr_class(...items: string[]) {
        const v = items
            .map((item) => item.trim())
            .filter((item) => (item.length > 0 ? true : false))
            .join(" ");
        this._attribute.set("class", v);
        return this;
    }
    export(v: string) {
        this._export_name = v;
        return this;
    }
    self(cb: (v: this) => void): this {
        cb(this);
        return this;
    }
    add(v: Element) {
        this._children.push(v);
        return this;
    }
    attr(v: { [key: string]: string }) {
        // merge, not replace
        Object.keys(v).forEach((name) => {
            const value = v[name];
            this._attribute.set(name, value);
        });
        return this;
    }
    attr_item(name: string, value: string) {
        this._attribute.set(name, value);
        return this;
    }
    children(v: Element[]) {
        this._children = v;
        return this;
    }
    // output<R>(
    //     plog: Logger,
    //     cb: { ok: (output: Output) => R; fail: (err: Error) => R }
    // ): R {
    //     const log = plog.sub("output");
    //     log.variable("name", this._name);
    //     log.variable("id", this._id);
    //     const output = new Output();
    //     let err = this.to_html(log, {
    //         ok: (v) => {
    //             output.html(v);
    //             return null;
    //         },
    //         fail: (err) => {
    //             return err;
    //         }
    //     });
    //     if (err) {
    //         return cb.fail(err);
    //     } else {
    //         return cb.ok(output);
    //     }
    // }
    to_text<R>(
        plog: Logger,
        cb: {
            ok: (v: string) => R;
            fail: (err: Error) => R;
        }
    ): R {
        const log = plog.sub("to_text");
        log.variable("name", this._name);
        log.variable("id", this._id);
        const name = this._name;
        const attr = this.attr_str();
        // TODO check invalid name
        const list: string[] = [];
        for (let item of this._children) {
            const err: Error | null = item.to_text(log, {
                ok: (v) => {
                    list.push(v);
                    return null;
                },
                fail: (err) => {
                    return err;
                }
            });
            if (err) {
                return cb.fail(err);
            }
        }
        const content = list.join("");
        let result = "";
        if (content) {
            result = `<${name}${attr ? " " + attr : ""}>${content}</${name}>`;
        } else {
            result = this._tag_omission
                ? `<${name}${attr ? " " + attr : ""}>` // no end tag needed
                : `<${name}${attr ? " " + attr : ""}></${name}>`;
        }
        return cb.ok(this.wrap_to_html(result));
    }
    protected wrap_to_html(v: string): string {
        return v;
    }
    private attr_str() {
        const list: string[] = [];
        // FIIXME
        // watch out! don't include any invalid key/value value here
        this._attribute.forEach((v, k) => {
            if (v === null) {
                list.push(`${k}`);
            } else {
                list.push(`${k}="${v}"`);
            }
        });
        const str = list.join(" ");
        return str;
    }
    private check_name() {
        // todo
    }
}
function next_id() {
    const v = _next_id.toString();
    _next_id++;
    return v;
}
