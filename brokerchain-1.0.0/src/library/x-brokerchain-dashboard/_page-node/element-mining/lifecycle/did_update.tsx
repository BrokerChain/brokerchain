// initialized by dev/system

import { Mining } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { MiningProps, MiningState } from "../type.js";

export function did_update(self: Mining, prev: { props: Readonly<MiningProps>; state: Readonly<MiningState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
