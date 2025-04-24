// initialized by dev/system

import { Info } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { InfoProps, InfoState } from "../type.js";

export function did_update(self: Info, prev: { props: Readonly<InfoProps>; state: Readonly<InfoState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
