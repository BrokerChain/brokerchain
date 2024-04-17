// initialized by dev/system

import { Value, ValueIO } from "../type/index.js";

export interface HeaderProps {
    id?: string;
    value: Value;
    io: ValueIO;
}

export interface HeaderState {
    // TODO
}

export function init_state(): HeaderState {
    return {};
}
