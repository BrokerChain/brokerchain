// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type NetworkProps = {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface NetworkState {
    // TODO
}

export function init_state(): NetworkState {
    return {};
}
