// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type RootProps = React.ComponentPropsWithoutRef<"div"> & {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
};

export interface RootState {
    // TODO
}

export function init_state(): RootState {
    return {};
}
