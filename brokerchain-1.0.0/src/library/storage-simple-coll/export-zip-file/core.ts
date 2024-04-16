// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { resolve_root } from "../_deprecated/simple-coll/disk/dirname/index.js";
import { compress } from "../../zip/export.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("storage-simple-coll.export-zip-file");
    log.variable("input", input);
    try {
        if (!input.namespace) {
            throw log.new_error("invalid namespace");
        }

        const root_dir = resolve_root(input.namespace);

        await compress(
            log,
            {
                from_path: root_dir,
                to_file: input.zip_file_name,
                without_parent_dir: false // must include the parent dir name
            },
            {
                ok: () => {
                    // ignore
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        return cb.ok({});
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
