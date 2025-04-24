// initialized by dev/system

import * as React from "react";
import { Root } from "./index.js";
import { value_fun, ValueIO, log, Info, Network, Chain, Pool, WorldState, Mining } from "../export.local.js";
// import {  } from "../../export.page.js";
import { Page, Panel, Button, Input, Select, AttributeList } from "../../_shared-components/index.js";

export function render(self: Root): React.ReactNode {
    const { value, io } = self.props.vio;

    return (
        <Page className="py-8">
            <Panel className="max-w-md mx-auto flex-grow" bodyClassName="space-y-4 px-0" header={`Node`} footer={<Button onClick={() => {}}>Edit</Button>}>
                <Info vio={self.props.vio} />
                <Network vio={self.props.vio} />
                <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"Ongoing Activity"} init={(v) => v.set("collapse", true)}>
                    <Mining vio={self.props.vio} />
                    <Pool vio={self.props.vio} />
                </Panel>
                <Panel className="translate-x-4 max-w-md" bodyClassName="space-y-4 px-0" header={"Verified Data"} init={(v) => v.set("collapse", true)}>
                    <Chain vio={self.props.vio} />
                    <WorldState vio={self.props.vio} />
                </Panel>
            </Panel>
        </Page>
    );
}
