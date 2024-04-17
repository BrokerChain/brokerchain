// initialized by dev/system

import { Value, ValueIO } from "../type/index.js";

export interface ContentProps {
    id?: string;
    value: Value;
    io: ValueIO;
}

export interface ContentState {
    // TODO
}

export function init_state(): ContentState {
    return {};
}
