// initialized by dev/system

import { Pool } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { PoolProps, PoolState } from "../type.js";

export function did_update(self: Pool, prev: { props: Readonly<PoolProps>; state: Readonly<PoolState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
