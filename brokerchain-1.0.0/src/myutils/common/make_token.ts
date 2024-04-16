import { guid } from "./guid.js";

export function make_token() {
    return guid() + guid();
}
