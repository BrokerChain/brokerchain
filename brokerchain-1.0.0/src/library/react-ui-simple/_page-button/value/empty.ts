// initialized by dev/system

import { Record, Content } from "../type/index.js";
// import {  } from "../../export.page.js";

// wrap the immutable factory function because:
// - avoid import cycle problem
//     import a function and invoke it immediately cause the problem
//     wrap the logic in function will not cause the problem (because the invoke is delayed)
// - easier to customize the empty value

export function empty() {
    const fun = Record<Content>({
        // none
    });

    return fun();
}
