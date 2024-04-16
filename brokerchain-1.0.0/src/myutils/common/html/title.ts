import { Element } from "./_/index.js";
import { raw2, Raw2 } from "./raw.js";
export class Title extends Element {
    constructor() {
        super("title");
    }
    raw(cb: (e: Raw2) => void) {
        const e = new Raw2();
        this._children.push(e);
        cb(e);
        return this;
    }
}
export function title(v: string = "") {
    const e = new Title();
    e._children.push(raw2(v));
    return e;
}
