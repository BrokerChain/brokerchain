import { Element } from "./_/index.js";
import { Raw2 } from "./raw.js";
export class Style extends Element {
    _content: Raw2 | null = null;
    constructor() {
        super("style");
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
export function style(...lines: string[]) {
    const v = lines.join("");
    return new Style().content(v);
}
