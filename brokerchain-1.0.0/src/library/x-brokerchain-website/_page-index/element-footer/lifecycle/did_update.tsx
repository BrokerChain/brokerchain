// initialized by dev/system

import { Footer } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { FooterProps, FooterState } from "../type.js";

export function did_update(self: Footer, prev: { props: Readonly<FooterProps>; state: Readonly<FooterState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
