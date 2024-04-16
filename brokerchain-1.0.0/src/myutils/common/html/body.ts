import { Element } from "./_/index.js";
import { Script } from "./script.js";
import { Div } from "./div.js";
import { Span } from "./span.js";
import { Raw2 } from "./raw.js";
export class Body extends Element {
    constructor() {
        super("body");
    }
    script(cb: (e: Script) => void) {
        const e = new Script();
        this._children.push(e);
        cb(e);
        return this;
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
export function body(...children: Element[]) {
    const e = new Body();
    e._children = children;
    return e;
}
