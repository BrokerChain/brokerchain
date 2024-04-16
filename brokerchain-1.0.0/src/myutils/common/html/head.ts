import { Element } from "./_/index.js";
import { Title } from "./title.js";
import { Script } from "./script.js";
export class Head extends Element {
    constructor() {
        super("head");
    }
    title(cb: (e: Title) => void) {
        const e = new Title();
        this._children.push(e);
        cb(e);
        return this;
    }
    script(cb: (e: Script) => void) {
        const e = new Script();
        this._children.push(e);
        cb(e);
        return this;
    }
}
export function head(...children: Element[]) {
    const e = new Head();
    e._children = children;
    return e;
}
