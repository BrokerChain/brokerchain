// initialized by dev/system

import * as React from "react";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    // const { value, io } = self.props.vio;
    const { vio, className, name, nameClassName, value, valueClassName, ...props } = self.props;

    return (
        <div className={clsx("grid grid-cols-2 gap-4 border-b-2 border-black pb-2", className)} {...props}>
            <div className={clsx("break-all", nameClassName)}>{name}</div>
            <div className={clsx("break-all", valueClassName)}>{value}</div>
        </div>
    );
}
