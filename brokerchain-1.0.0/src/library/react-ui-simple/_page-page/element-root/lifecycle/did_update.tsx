// initialized by dev/system

import { Root } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { RootProps, RootState } from "../type.js";

export function did_update(self: Root, prev: { props: Readonly<RootProps>; state: Readonly<RootState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
