// initialized by dev/system

import { Chain } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { ChainProps, ChainState } from "../type.js";

export function did_update(self: Chain, prev: { props: Readonly<ChainProps>; state: Readonly<ChainState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
