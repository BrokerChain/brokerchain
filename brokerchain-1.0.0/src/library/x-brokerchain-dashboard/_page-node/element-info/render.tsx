// initialized by dev/system

import * as React from "react";
import { Info } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";
import { Page, Panel, Button, Input, Select, AttributeList } from "../../_shared-components/index.js";

export function render(self: Info): React.ReactNode {
    const { value, io } = self.props.vio;

    return (
        <AttributeList
            list={[
                { name: "ID", value: "-" },
                { name: "Status", value: "-" },
                { name: "Address", value: "-" },
                { name: "Port", value: "-" },
                { name: "Type", value: "-" },
                { name: "Network ID", value: "-" },
                { name: "Chain ID", value: "-" },
                { name: "Block height", value: "-" },
                { name: "Created at", value: "-" },
                { name: "Updated at", value: "-" }
            ]}
        />
    );
}
