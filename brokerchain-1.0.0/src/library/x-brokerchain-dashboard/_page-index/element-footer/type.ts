// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type FooterProps = {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface FooterState {
    // TODO
}

export function init_state(): FooterState {
    return {};
}
