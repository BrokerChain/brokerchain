import { Logger } from "../../../../../myutils/logger.js";
import * as dirname from "./dirname/index.js";
import { write_multi_json_file } from "../../../../../myutils/node/file/index.js";
import { Collection } from "../type/index.js";
interface Callback<R> {
    ok: () => R;
    fail: (err: Error) => R;
}
export async function collection_save<R>(plog: Logger, data: Collection<any>, cb: Callback<R>): Promise<R> {
    const log = plog.sub("save_collection");
    const { namespace, key } = data;
    const base_dir = dirname.resolve(namespace, key);
    const metadata_file = dirname.resolve_metadata(namespace, key);
    log.variable("namespace", namespace);
    log.variable("key", key);
    log.variable("base_dir", base_dir);
    log.variable("metadata_file", metadata_file);
    const result = await write_multi_json_file(
        log,
        {
            dir: base_dir,
            items: [
                {
                    name: "metadata.json",
                    content: JSON.stringify(data.metadata)
                },
                ...data.items.map((item) => ({
                    name: `item@${item.id}.json`,
                    content: JSON.stringify(item)
                }))
            ]
        },
        {
            ok: async () => {
                log.ok();
                return cb.ok();
            },
            fail: async (err) => {
                log.fail();
                return cb.fail(err);
            }
        }
    );
    return result;
}
