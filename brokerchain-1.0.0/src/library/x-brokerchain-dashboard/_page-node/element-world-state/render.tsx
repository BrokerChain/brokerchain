// initialized by dev/system

import * as React from "react";
import { WorldState } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";
import { Page, Panel, Button, Input, Select, AttributeList } from "../../_shared-components/index.js";

export function render(self: WorldState): React.ReactNode {
    const { value, io } = self.props.vio;
    const { world_state } = value.get("data");

    return (
        <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"World State"} init={(v) => v.set("collapse", true)}>
            <AttributeList list={[{ name: "Block Height", value: world_state.block_height.toString() || "-" }]} />
            <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"Account List"} init={(v) => v.set("collapse", true)}>
                {world_state.account_list.map((account) => (
                    <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"Account"} init={(v) => v.set("collapse", true)}>
                        <AttributeList
                            list={[
                                { name: "Shard ID", value: account.shard_id || "-" },
                                { name: "Address", value: account.address || "-" },
                                { name: "Balance", value: account.balance.toString() || "-" },
                                { name: "Created at", value: account.created_at || "-" },
                                { name: "Updated at", value: account.updated_at || "-" }
                            ]}
                        />
                    </Panel>
                ))}
            </Panel>
            <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"Contract List"} init={(v) => v.set("collapse", true)}>
                {world_state.contract_list.map((contract) => (
                    <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"Contract"} init={(v) => v.set("collapse", true)}>
                        <AttributeList
                            list={[
                                { name: "Shard ID", value: contract.shard_id || "-" },
                                { name: "Address", value: contract.address || "-" },
                                { name: "Balance", value: contract.balance.toString() || "-" },
                                { name: "Code", value: contract.code || "-" },
                                { name: "Owner Account Address", value: contract.owner_account_address || "-" },
                                { name: "Created at", value: contract.created_at || "-" },
                                { name: "Updated at", value: contract.updated_at || "-" }
                            ]}
                        />
                    </Panel>
                ))}
            </Panel>
        </Panel>
    );
}
