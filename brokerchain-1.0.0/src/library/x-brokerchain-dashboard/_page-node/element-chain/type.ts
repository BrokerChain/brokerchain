// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type ChainProps = {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface ChainState {
    // TODO
}

export function init_state(): ChainState {
    return {};
}
