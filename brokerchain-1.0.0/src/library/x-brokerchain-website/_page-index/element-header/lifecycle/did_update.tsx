// initialized by dev/system

import { Header } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { HeaderProps, HeaderState } from "../type.js";

export function did_update(self: Header, prev: { props: Readonly<HeaderProps>; state: Readonly<HeaderState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
