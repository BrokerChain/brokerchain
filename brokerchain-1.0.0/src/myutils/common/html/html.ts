import { Element } from "./_/index.js";
import { Head } from "./head.js";
import { Body } from "./body.js";
export class Html extends Element {
    _head: Head | null = null;
    _body: Body | null = null;
    constructor() {
        super("html");
    }
    protected wrap_to_html(v: string): string {
        return "<!DOCTYPE html>" + v;
    }
    head(cb: (head: Head) => void) {
        if (!this._head) {
            this._head = new Head();
            this._children.push(this._head);
        }
        cb(this._head);
        return this;
    }
    body(cb: (body: Body) => void) {
        if (!this._body) {
            this._body = new Body();
            this._children.push(this._body);
        }
        cb(this._body);
        return this;
    }
}
export function html(...children: Element[]) {
    const e = new Html();
    e._children = children;
    return e;
}
