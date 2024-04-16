import { Logger } from "../../../../../myutils/logger.js";
import * as fs from "node:fs";
import * as dirname from "./dirname/index.js";
import { read_multi_json_file } from "../../../../../myutils/node/file/index.js";
import { Collection } from "../type/index.js";
interface Callback<R> {
    ok: (data: Collection<any>) => R;
    fail: (err: Error) => R;
}
export async function collection_load<R>(
    plog: Logger,
    target: {
        namespace: string;
        key: string;
    },
    cb: Callback<R>
): Promise<R> {
    const log = plog.sub("collection_load");
    const { namespace, key } = target;
    const base_dir = dirname.resolve(namespace, key);
    const metadata_file = dirname.resolve_metadata(namespace, key);
    log.variable("namespace", namespace);
    log.variable("key", key);
    log.variable("base_dir", base_dir);
    log.variable("metadata_file", metadata_file);
    const data: Collection<any> = {
        namespace,
        key,
        metadata: {},
        items: []
    };
    // base_dir may not exists
    if (!fs.existsSync(base_dir)) {
        log.warn("directory not exists: " + base_dir);
        return cb.ok(data);
    }
    const result = await read_multi_json_file(
        log,
        {
            dir: base_dir,
            filter: (item) => {
                const accept = item.name === "metadata.json" || /^item@.+\.json$/.test(item.name);
                return accept;
            }
        },
        {
            empty: () => {
                log.println("empty, no file");
                return cb.ok(data);
            },
            ok: (items) => {
                items.forEach((item) => {
                    if (item.name === "metadata.json") {
                        data.metadata = item.content;
                    } else {
                        data.items.push(item.content);
                    }
                });
                log.ok();
                return cb.ok(data);
            },
            fail: (err) => {
                log.fail();
                return cb.fail(err);
            }
        }
    );
    return result;
}
