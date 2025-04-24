// initialized by dev/system

import * as React from "react";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
import { Button } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    const { value, io } = self.props.vio;

    return (
        <div className="">
            <Button>Hello world</Button>
        </div>
    );
}
