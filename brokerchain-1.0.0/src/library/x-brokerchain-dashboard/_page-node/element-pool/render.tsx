// initialized by dev/system

import * as React from "react";
import { Pool } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";
import { Page, Panel, Button, Input, Select, AttributeList } from "../../_shared-components/index.js";

export function render(self: Pool): React.ReactNode {
    const { value, io } = self.props.vio;
    const { pool } = value.get("data");

    return (
        <Panel
            className="translate-x-4 max-w-md"
            bodyClassName="space-y-4 px-0"
            header={"Transaction Pool"}
            init={(v) => v.set("collapse", true)}
            hideFooterIfCollapsed={true}
            footer={<Button onClick={() => {}}>Add transaction</Button>}
        >
            {pool.transaction_list.length === 0 && <div className="px-4">Empty.</div>}
            {pool.transaction_list.map((item) => {
                return (
                    <Panel
                        className="translate-x-4 max-w-md"
                        bodyClassName="space-y-4 px-0"
                        header={"Transaction " + item.id}
                        init={(v) => v.set("collapse", true)}
                        hideFooterIfCollapsed={true}
                        // footer={<Button onClick={() => {}}>Remove</Button>}
                    >
                        <AttributeList
                            list={[
                                { name: "ID", value: item.id || "-" },
                                { name: "Shard ID", value: item.shard_id || "-" },
                                { name: "Parent Block Hash", value: item.parent_block_hash || "-" },
                                { name: "Type", value: item.type || "-" },
                                { name: "From Address", value: item.from_address || "-" },
                                { name: "To Address", value: item.to_address || "-" },
                                { name: "Amount", value: item.amount.toString() || "-" },
                                { name: "data", value: JSON.stringify(item.data || {}) || "-", hide: item.data === undefined },
                                { name: "Created at", value: item.created_at || "-" },
                                { name: "Updated at", value: item.updated_at || "-" }
                            ]}
                        />
                    </Panel>
                );
            })}
        </Panel>
    );
}
