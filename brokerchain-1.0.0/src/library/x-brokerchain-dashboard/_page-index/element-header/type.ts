// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type HeaderProps = {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface HeaderState {
    // TODO
}

export function init_state(): HeaderState {
    return {};
}
