// initialized by dev/system

import * as React from "react";
import { Mining } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";
import { Page, Panel, Button, Input, Select, AttributeList } from "../../_shared-components/index.js";

export function render(self: Mining): React.ReactNode {
    const { value, io } = self.props.vio;
    const { mining } = value.get("data");

    return (
        <Panel
            className="translate-x-4 max-w-md"
            bodyClassName="space-y-4 px-0"
            header={"Mining"}
            init={(v) => v.set("collapse", true)}
            hideFooterIfCollapsed={true}
            footer={<Button onClick={() => {}}>Start mining</Button>}
        >
            <AttributeList
                list={[
                    { name: "Status", value: mining.status || "-" },
                    { name: "Shard ID", value: mining.shard_id || "-" },
                    { name: "Parent Block Hash", value: mining.parent_block_hash || "-" },
                    { name: "Miner Account Address", value: mining.miner_account_address || "-" }
                ]}
            />
        </Panel>
    );
}
