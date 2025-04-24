// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type MiningProps = {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface MiningState {
    // TODO
}

export function init_state(): MiningState {
    return {};
}
