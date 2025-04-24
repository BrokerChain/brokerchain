// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type PoolProps = {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface PoolState {
    // TODO
}

export function init_state(): PoolState {
    return {};
}
