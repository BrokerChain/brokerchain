// initialized by dev/system

import * as React from "react";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
import { Input } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    // const { value, io } = self.props.vio;
    const { vio, ...props } = self.props;
    return (
        <Input
            type="number"
            placeholder={props.placeholder}
            disabled={props.disabled}
            value={props.value === undefined ? "0" : props.value.toString()}
            onChange={(v) => {
                if (props.onChange) {
                    props.onChange(parseFloat(v));
                }
            }}
        >
            {props.children}
        </Input>
    );
}
