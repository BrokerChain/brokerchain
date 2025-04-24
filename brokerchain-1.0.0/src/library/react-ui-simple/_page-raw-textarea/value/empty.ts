// initialized by dev/system

import { Record, Content } from "../type/index.js";
// import {  } from "../../export.page.js";

// Wrap the immutable factory function to:
// - Avoid import cycle issues:
//     Importing a function and invoking it immediately can cause these issues.
//     Wrapping the logic inside a function avoids these issues because the invocation is delayed.
// - Simplify customization of the empty value.

export function empty() {
    const fun = Record<Content>({
        // TODO
    });

    return fun();
}
