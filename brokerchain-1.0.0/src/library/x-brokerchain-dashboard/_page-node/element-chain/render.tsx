// initialized by dev/system

import * as React from "react";
import { Chain } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";
import { Page, Panel, Button, Input, Select, AttributeList } from "../../_shared-components/index.js";

export function render(self: Chain): React.ReactNode {
    const { value, io } = self.props.vio;
    const { chain } = value.get("data");

    return (
        <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"Blockchain"} init={(v) => v.set("collapse", true)}>
            {/* <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"Shard List"} init={(v) => v.set("collapse", true)} hideFooterIfCollapsed={true}> */}
            {chain.shard_list.map((shard) => (
                <Panel
                    className="translate-x-4 max-w-md"
                    bodyClassName="space-y-4 px-0"
                    header={"Shard"}
                    init={(v) => v.set("collapse", true)}
                    hideFooterIfCollapsed={true}
                >
                    <AttributeList
                        list={[
                            { name: "Shard ID", value: shard.id || "-" },
                            { name: "Created at", value: shard.created_at || "-" },
                            { name: "Updated at", value: shard.updated_at || "-" }
                        ]}
                    />
                    <Panel
                        className="translate-x-4 max-w-md"
                        bodyClassName="space-y-4 px-0"
                        header={"Block List"}
                        init={(v) => v.set("collapse", true)}
                        hideFooterIfCollapsed={true}
                    >
                        {shard.block_list.map((block) => (
                            <Panel
                                className="translate-x-4 max-w-md"
                                bodyClassName="space-y-4 px-0"
                                header={"Block"}
                                init={(v) => v.set("collapse", true)}
                                hideFooterIfCollapsed={true}
                            >
                                <AttributeList
                                    list={[
                                        { name: "Shard ID", value: block.shard_id || "-" },
                                        { name: "Parent Block Hash", value: block.parent_block_hash || "-" },
                                        { name: "Hash", value: block.hash || "-" },
                                        { name: "Created at", value: shard.created_at || "-" },
                                        { name: "Updated at", value: shard.updated_at || "-" }
                                    ]}
                                />
                                {block.transaction_list.map((transaction) => (
                                    <Panel
                                        className="translate-x-4 max-w-md"
                                        bodyClassName="space-y-4 px-0"
                                        header={"Transaction " + transaction.id}
                                        init={(v) => v.set("collapse", true)}
                                        hideFooterIfCollapsed={true}
                                        // footer={<Button onClick={() => {}}>Remove</Button>}
                                    >
                                        <AttributeList
                                            list={[
                                                { name: "ID", value: transaction.id || "-" },
                                                { name: "Shard ID", value: transaction.shard_id || "-" },
                                                { name: "Parent Block Hash", value: transaction.parent_block_hash || "-" },
                                                { name: "Type", value: transaction.type || "-" },
                                                { name: "From Address", value: transaction.from_address || "-" },
                                                { name: "To Address", value: transaction.to_address || "-" },
                                                { name: "Amount", value: transaction.amount.toString() || "-" },
                                                { name: "data", value: JSON.stringify(transaction.data || {}) || "-", hide: transaction.data === undefined },
                                                { name: "Created at", value: transaction.created_at || "-" },
                                                { name: "Updated at", value: transaction.updated_at || "-" }
                                            ]}
                                        />
                                    </Panel>
                                ))}
                            </Panel>
                        ))}
                    </Panel>

                    <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"World State"} init={(v) => v.set("collapse", true)}>
                        {/* <AttributeList list={[{ name: "Block Height", value: shard.world_state.block_height.toString() || "-" }]} /> */}
                        <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"Account List"} init={(v) => v.set("collapse", true)}>
                            {shard.world_state.account_list.map((account) => (
                                <Panel
                                    className="translate-x-4 max-w-md"
                                    bodyClassName="space-y-4 px-0"
                                    header={"Account"}
                                    init={(v) => v.set("collapse", true)}
                                >
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
                            {shard.world_state.contract_list.map((contract) => (
                                <Panel
                                    className="translate-x-4 max-w-md"
                                    bodyClassName="space-y-4 px-0"
                                    header={"Contract"}
                                    init={(v) => v.set("collapse", true)}
                                >
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
                </Panel>
            ))}
            {/* </Panel> */}
        </Panel>
    );
}
