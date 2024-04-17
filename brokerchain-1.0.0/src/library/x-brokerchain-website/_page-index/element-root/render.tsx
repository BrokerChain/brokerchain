// initialized by dev/system

import * as React from "react";
import { Root } from "./index.js";
import { value_fun, ValueIO, log, Header, Content, Footer } from "../export.local.js";
// import {  } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    const { value, io } = self.props;

    return (
        <div className="">
            <Header value={value} io={io} />
            <Content value={value} io={io} />
            <Footer value={value} io={io} />
        </div>
    );
}
