import { guid } from "./guid.js";

export function make_finger() {
    return guid() + guid();
}
