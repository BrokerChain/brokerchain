import * as dir from "../../../../../../myutils/node/dir/index.js";
import { ns_encode } from "./ns_encode.js";
export function resolve_root(namespace: string) {
    return dir.resolve(dir.simple_coll, ns_encode(namespace));
}
