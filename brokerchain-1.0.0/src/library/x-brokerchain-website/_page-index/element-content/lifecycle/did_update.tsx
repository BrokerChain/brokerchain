// initialized by dev/system

import { Content } from "../index.js";
import { value_fun, ValueIO, log } from "../../export.local.js";
import { ContentProps, ContentState } from "../type.js";

export function did_update(self: Content, prev: { props: Readonly<ContentProps>; state: Readonly<ContentState> }) {
    const { value, io } = self.props.vio;
    // TODO
}
