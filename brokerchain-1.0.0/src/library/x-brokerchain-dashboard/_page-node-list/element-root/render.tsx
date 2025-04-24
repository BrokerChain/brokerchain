// initialized by dev/system

import * as React from "react";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";
import { Page, Panel, Button, Input, Select, AttributeList } from "../../_shared-components/index.js";

export function render(self: Root): React.ReactNode {
    const { value, io } = self.props.vio;

    return (
        <Page className="py-8">
            <Panel className="max-w-md mx-auto flex-grow" bodyClassName="space-y-4 px-0" header={`Node List`} footer={<Button onClick={() => {}}>Add</Button>}>
                <Panel
                    className="translate-x-4 max-w-md"
                    bodyClassName="space-y-4 px-0"
                    header={"Node"}
                    footer={
                        <Button
                            onClick={() => {
                                // location.href = `../node/index.html?id=${encodeURIComponent(item.node.id)}`;
                            }}
                        >
                            View
                        </Button>
                    }
                >
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
                </Panel>
            </Panel>
        </Page>
    );
}
