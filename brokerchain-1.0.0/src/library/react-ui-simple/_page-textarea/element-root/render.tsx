// initialized by dev/system

import * as React from "react";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
import { Label, RawTextarea } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    const { vio, ...props } = self.props;

    return (
        <div>
            {props.children && <Label>{props.children}</Label>}
            <RawTextarea
                placeholder={props.placeholder}
                disabled={props.disabled}
                value={props.value}
                onChange={(e) => {
                    if (props.onChange) {
                        props.onChange(e.target.value);
                    }
                }}
                // readOnly={props.value ? true : false}
            />
        </div>
    );
}
