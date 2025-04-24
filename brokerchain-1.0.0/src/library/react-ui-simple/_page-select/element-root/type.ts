// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type RootProps = React.ComponentPropsWithoutRef<"select"> & {
    vio: { value: Value; io: ValueIO };
    // children?: React.ReactNode;
    options?: { value: string; content: React.ReactNode }[];
};

export interface RootState {
    // TODO
}

export function init_state(): RootState {
    return {};
}
