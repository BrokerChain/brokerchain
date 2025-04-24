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

    const is_file = info.isFile();
    log.variable("is_file", is_file);

    if (!is_file) {
        throw log.new_error("target exists, but it is not a file");
    }

    return cb.ok({});
}
