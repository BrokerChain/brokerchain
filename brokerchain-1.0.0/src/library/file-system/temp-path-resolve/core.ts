// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as os from "node:os";
import * as path from "node:path";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const base_dir = os.tmpdir();
    log.variable("base_dir", base_dir);

    const resolved_path = path.resolve(base_dir, ...input.part_list);
    log.variable("resolved_path", resolved_path);

    // security check
    if (resolved_path.indexOf(base_dir) !== 0) {
        throw log.new_error("Resolved path must be within the temporary directory. Please ensure the provided path components do not navigate outside of it.");
    }

    const dir_name = path.dirname(resolved_path);
    const base_name = path.basename(resolved_path);

    return cb.ok({
        path: resolved_path,
        dir_name,
        base_name
    });
}
