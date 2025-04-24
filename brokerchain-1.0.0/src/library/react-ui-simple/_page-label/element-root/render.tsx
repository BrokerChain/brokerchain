// initialized by dev/system

import * as React from "react";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    // const { value, io } = self.props.vio;

    return <div className="mb-2">{self.props.children}</div>;
}
