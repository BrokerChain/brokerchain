import { Element } from "./_/index.js";
export class Img extends Element {
    constructor() {
        super("img");
        this._tag_omission = true;
    }
}
export function img() {
    return new Img();
}
