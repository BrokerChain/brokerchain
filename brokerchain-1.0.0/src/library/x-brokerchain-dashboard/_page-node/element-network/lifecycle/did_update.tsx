// initialized by dev/system

import { Network } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { NetworkProps, NetworkState } from "../type.js";

export function did_update(self: Network, prev: { props: Readonly<NetworkProps>; state: Readonly<NetworkState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
