// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type ContentProps = {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface ContentState {
    // TODO
}

export function init_state(): ContentState {
    return {};
}
