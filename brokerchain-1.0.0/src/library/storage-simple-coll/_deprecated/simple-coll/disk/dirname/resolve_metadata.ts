import * as dir from "../../../../../../myutils/node/dir/index.js";
import { ns_encode } from "./ns_encode.js";
import { key_encode } from "./key_encode.js";
import { metadata_encode } from "./metadata_encode.js";
export function resolve_metadata(namespace: string, key: string) {
    return dir.resolve(dir.simple_coll, ns_encode(namespace), key_encode(key), metadata_encode("metadata.json"));
}
