import { Element } from "./_/index.js";
export class Link extends Element {
    constructor() {
        super("link");
        this._tag_omission = true;
    }
}
export function link(...children: Element[]) {
    const e = new Link();
    e._children = children;
    return e;
}
