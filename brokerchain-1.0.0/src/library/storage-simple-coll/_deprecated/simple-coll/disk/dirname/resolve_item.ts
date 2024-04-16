import * as dir from "../../../../../../myutils/node/dir/index.js";
import { ns_encode } from "./ns_encode.js";
import { key_encode } from "./key_encode.js";
import { item_encode } from "./item_encode.js";
export function resolve_item(namespace: string, key: string, id: string) {
    return dir.resolve(dir.simple_coll, ns_encode(namespace), key_encode(key), `${item_encode(id)}.json`);
}
