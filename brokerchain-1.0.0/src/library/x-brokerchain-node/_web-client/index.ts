// auto generated by dev/system

import { LibraryType } from "./type.js";
import { make_library_client } from "../../../myutils/common/rpc/make_library_client.js";

export const x_brokerchain_node: LibraryType = make_library_client<LibraryType>("x-brokerchain-node");

export function make_x_brokerchain_node(base_url: string): LibraryType {
    return make_library_client<LibraryType>("x-brokerchain-node", base_url);
}
