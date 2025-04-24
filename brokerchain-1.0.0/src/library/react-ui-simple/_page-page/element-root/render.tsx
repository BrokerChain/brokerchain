// initialized by dev/system

import * as React from "react";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    // const { value, io } = self.props.vio;
    const { className, children } = self.props;

    return (
        <div
            className={clsx("bg-slate-50 overflow-auto", className)}
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }}
        >
            {children}
        </div>
    );
}
