// initialized by dev/system

import { Value, ValueIO } from "../type/index.js";

export interface FooterProps {
    id?: string;
    value: Value;
    io: ValueIO;
}

export interface FooterState {
    // TODO
}

export function init_state(): FooterState {
    return {};
}
