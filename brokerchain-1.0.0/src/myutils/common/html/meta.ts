import { Element } from "./_/index.js";
export class Meta extends Element {
    constructor() {
        super("meta");
        this._tag_omission = true;
    }
}
export function meta() {
    return new Meta();
}
