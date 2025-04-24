// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export type RootProps = {
    vio: { value: Value; io: ValueIO };
    placeholder?: string;
    disabled?: boolean;
    value?: Date;
    onChange?: (v: Date) => void;
    children?: React.ReactNode;
};

export interface RootState {
    // TODO
}

export function init_state(): RootState {
    return {};
}
