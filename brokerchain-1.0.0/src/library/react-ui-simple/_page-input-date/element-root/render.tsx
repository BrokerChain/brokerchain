// initialized by dev/system

import * as React from "react";
import * as fns from "date-fns";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
import { Input } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    const { value, io } = self.props.vio;
    const { vio, ...props } = self.props;
    return (
        <Input
            type="date"
            placeholder={props.placeholder}
            disabled={props.disabled}
            value={fns.format(props.value ? props.value : new Date(), "yyyy-MM-dd")}
            onChange={(v) => {
                const date = fns.parse(v, "yyyy-MM-dd", new Date());
                // console.log(date);
                if (props.onChange) {
                    props.onChange(date);
                }
            }}
        >
            {props.children}
        </Input>
    );
}
