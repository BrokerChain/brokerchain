// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type InfoProps = {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface InfoState {
    // TODO
}

export function init_state(): InfoState {
    return {};
}
