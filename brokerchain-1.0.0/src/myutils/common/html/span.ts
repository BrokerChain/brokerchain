import { Element } from "./_/index.js";
import { Raw2 } from "./raw.js";
export class Span extends Element {
    constructor() {
        super("span");
    }
    raw(cb: (e: Raw2) => void) {
        const e = new Raw2();
        this._children.push(e);
        cb(e);
        return this;
    }
}
export function span(...children: Element[]) {
    const e = new Span();
    e._children = children;
    return e;
}
