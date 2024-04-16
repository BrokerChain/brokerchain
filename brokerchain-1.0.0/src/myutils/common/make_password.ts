import { guid } from "./guid.js";

export function make_password() {
    return guid() + guid();
}
