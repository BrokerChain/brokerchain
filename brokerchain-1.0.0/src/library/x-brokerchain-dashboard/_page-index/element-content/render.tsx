// initialized by dev/system

import * as React from "react";
import { Content } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";

export function render(self: Content): React.ReactNode {
    const { value, io } = self.props.vio;

    return <div className="">TODO Content</div>;
}
