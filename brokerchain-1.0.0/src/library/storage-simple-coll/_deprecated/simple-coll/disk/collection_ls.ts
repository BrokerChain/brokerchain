import { Logger } from "../../../../../myutils/logger.js";
import * as dir from "../../../../../myutils/node/dir/index.js";
import { list_dir, Item } from "../../../../../myutils/node/file/list_dir.js";
import * as dirname from "./dirname/index.js";
interface Callback<R> {
    ok: (data: DataItem[]) => R;
    fail: (err: Error) => R;
}
interface DataItem {
    namespace: string;
    key: string;
}
export async function collection_ls<R>(plog: Logger, cb: Callback<R>): Promise<R> {
    const log = plog.sub("collection_ls");
    const base_dir = dir.simple_coll;
    const data: DataItem[] = [];
    const ns_dirs: Item[] = await list_dir(
        log,
        {
            dir: base_dir,
            filter: (item) => dirname.ns_test(item.name)
        },
        {
            empty: async () => {
                return [];
            },
            ok: async (items) => {
                return items;
            },
            fail: async (err) => {
                return [];
            }
        }
    );
    for (let ns_dir of ns_dirs) {
        await list_dir(
            log,
            {
                dir: ns_dir.fullname,
                filter: (item) => dirname.key_test(item.name)
            },
            {
                empty: async () => {
                    // ignore
                },
                ok: async (items) => {
                    items.forEach((key_dir) => {
                        data.push({
                            namespace: dirname.ns_decode(ns_dir.name),
                            key: dirname.key_decode(key_dir.name)
                        });
                    });
                },
                fail: async (err) => {
                    // ignore
                }
            }
        );
    }
    // load all collections
    log.variable_debug("data", data);
    return cb.ok(data);
}
