import { Element } from "./_/index.js";
export class Base extends Element {
    constructor() {
        super("base");
    }
}
export function base() {
    return new Base();
}
