// initialized by dev/system

import { Value, ValueIO } from "../type/index.js";

export interface RootProps {
    id?: string;
    value: Value;
    io: ValueIO;
}

export interface RootState {
    // TODO
}

export function init_state(): RootState {
    return {};
}
