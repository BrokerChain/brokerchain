// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as fs from "node:fs/promises";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    try {
        var info = await fs.stat(input.name);
        log.variable("info", info);
    } catch (err) {
        log.warn(err);
        return cb.none();
    }

    const is_dir = info.isDirectory();
    log.variable("is_dir", is_dir);

    if (!is_dir) {
        throw log.new_error("target exists, but it is not a directory");
    }

    return cb.ok({});
}
