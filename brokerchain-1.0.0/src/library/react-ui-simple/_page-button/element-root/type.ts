// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export interface RootProps {
    vio: { value: Value; io: ValueIO };
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

export interface RootState {
    // TODO
}

export function init_state(): RootState {
    return {};
}
