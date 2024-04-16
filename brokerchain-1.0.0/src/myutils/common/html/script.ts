import { Element } from "./_/index.js";
import { Raw2 } from "./raw.js";
export class Script extends Element {
    _content: Raw2 | null = null;
    constructor() {
        super("script");
        this._tag_omission = false;
    }
    src(v: string) {
        this.attr_item("src", v);
        return this;
    }
    content(v: string) {
        // FIXME encoding
        if (!this._content) {
            this._content = new Raw2();
            this._children.push(this._content);
        }
        this._content._content = v;
        return this;
    }
}
export function script(...lines: string[]) {
    const v = lines.join("");
    return new Script().content(v);
}
