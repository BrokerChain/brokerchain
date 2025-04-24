// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as fs from "node:fs/promises";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    // maybe should use fs.access() here
    try {
        var info = await fs.stat(input.name);
        log.variable("info", info);
    } catch (err) {
        log.warn(err);
        return cb.none();
    }

    return cb.ok({});
}
