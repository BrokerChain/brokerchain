import { Element } from "./_/index.js";
export class A extends Element {
    constructor() {
        super("a");
    }
}
export function a(...children: Element[]) {
    const e = new A();
    e._children = children;
    return e;
}
