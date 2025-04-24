// initialized by dev/system

import * as React from "react";
import { Value, ValueIO } from "../type/index.js";

export interface PhoneValue {
    country_code: string;
    phone_number: string;
}

export type RootProps = {
    vio: { value: Value; io: ValueIO };
    placeholder?: string;
    disabled?: boolean;
    value?: PhoneValue;
    onChange?: (v: PhoneValue) => void;
    children?: React.ReactNode;
};

export interface RootState {
    // TODO
}

export function init_state(): RootState {
    return {};
}
