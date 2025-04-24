// initialized by dev/system

import * as React from "react";
import { Network } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";
import { Page, Panel, Button, Input, Select, AttributeList } from "../../_shared-components/index.js";

export function render(self: Network): React.ReactNode {
    const { value, io } = self.props.vio;
    const { network } = value.get("data");

    return (
        <Panel
            className="translate-x-4 max-w-md"
            bodyClassName="space-y-4 px-0"
            header={"Network"}
            init={(v) => v.set("collapse", true)}
            hideFooterIfCollapsed={true}
            footer={<Button onClick={() => {}}>Add node</Button>}
        >
            {network.node_list.length === 0 && <div className="px-4">Empty.</div>}
            {network.node_list.map((item) => {
                return (
                    <Panel
                        className="translate-x-4 max-w-md"
                        bodyClassName="space-y-4 px-0"
                        header={"Node " + item.id}
                        init={(v) => v.set("collapse", true)}
                        hideFooterIfCollapsed={true}
                        footer={<Button onClick={() => {}}>Visit</Button>}
                    >
                        <AttributeList
                            list={[
                                { name: "ID", value: item.id || "-" },
                                { name: "Address", value: item.address || "-" },
                                { name: "Port", value: item.port.toString() || "-" },
                                { name: "Type", value: item.type || "-" },
                                { name: "Network ID", value: item.network_id || "-" },
                                { name: "Chain ID", value: item.chain_id || "-" },
                                { name: "Shard ID", value: item.shard_id || "-" },
                                { name: "Block height", value: item.block_height.toString() || "-" },
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
