// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type WorldStateProps = {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface WorldStateState {
    // TODO
}

export function init_state(): WorldStateState {
    return {};
}
