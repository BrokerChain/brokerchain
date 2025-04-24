// initialized by dev/system

import * as React from "react";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";
import { Page, Panel, Button, Input, InputNumber, Select, AttributeList } from "../../_shared-components/index.js";

export function render(self: Root): React.ReactNode {
    const { value, io } = self.props.vio;

    return (
        <Page className="py-8">
            <Panel
                className="max-w-md mx-auto flex-grow"
                bodyClassName="space-y-4 pb-12"
                header={`Add Node`}
                footer={<Button onClick={() => {}}>Submit</Button>}
            >
                <Input
                // disabled={submitting}
                // value={data.destination}
                // onChange={(destination) =>
                //     io.mutate((v) => {
                //         v.data.destination = destination.trim().toUpperCase();
                //     })
                // }
                >
                    Address (IPv4/IPv6/Domain)
                </Input>
                <InputNumber
                // disabled={submitting}
                // value={data.destination}
                // onChange={(destination) =>
                //     io.mutate((v) => {
                //         v.data.destination = destination.trim().toUpperCase();
                //     })
                // }
                >
                    Port
                </InputNumber>
            </Panel>
        </Page>
    );
}
