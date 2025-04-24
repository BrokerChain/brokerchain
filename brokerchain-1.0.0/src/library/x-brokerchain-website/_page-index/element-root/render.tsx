// initialized by dev/system

import * as React from "react";
import { Root } from "./index.js";
import { value_fun, ValueIO, log, Header, Content, Footer } from "../export.local.js";
// import {  } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    const { value, io } = self.props.vio;

    return (
        <div className="">
            <Header vio={self.props.vio} />
            <Content vio={self.props.vio} />
            <Footer vio={self.props.vio} />
        </div>
    );
}
