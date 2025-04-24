// initialized by dev/system

import * as React from "react";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    // const { value, io } = self.props.vio;
    const { vio, className, ...props } = self.props;

    return (
        <input
            className={clsx("block w-full px-2 py-2 rounded border-2 border-black", className)}
            style={{
                // @DESIGN-FIX-BORDER
                // py-2 是上下留 8px 但是，由于有 border 上下又有 2px
                // 导致整体的高度实际上，总共变高了 8px
                // 这个问题用 box-sizing 解决不了，只能手工修正上下 padding
                paddingTop: 8 - 2,
                paddingBottom: 8 - 2,
                ...props.style
            }}
            {...props}
        />
    );
}
