// initialized by dev/system

import { WorldState } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { WorldStateProps, WorldStateState } from "../type.js";

export function did_update(self: WorldState, prev: { props: Readonly<WorldStateProps>; state: Readonly<WorldStateState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
