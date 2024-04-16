import { Element } from "./_/index.js";
import { Span } from "./span.js";
import { Raw2 } from "./raw.js";
export class Div extends Element {
    constructor() {
        super("div");
        this._tag_omission = false;
    }
    div(cb: (e: Div) => void) {
        const e = new Div();
        this._children.push(e);
        cb(e);
        return this;
    }
    span(cb: (e: Span) => void) {
        const e = new Span();
        this._children.push(e);
        cb(e);
        return this;
    }
    raw(cb: (e: Raw2) => void) {
        const e = new Raw2();
        this._children.push(e);
        cb(e);
        return this;
    }
}
export function div(...children: Element[]) {
    const e = new Div();
    e._children = children;
    return e;
}
