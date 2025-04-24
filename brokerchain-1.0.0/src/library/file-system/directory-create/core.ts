// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as fs from "node:fs/promises";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    try {
        var info = await fs.stat(input.name);
        log.variable("info", info);
        if (info.isDirectory()) {
            return cb.skip();
        } else {
            throw log.new_error("target exists but it is not a directory: " + input.name);
        }
    } catch (err) {
        // ok, not exists
    }

    await fs.mkdir(input.name, { recursive: true });
    return cb.ok({});
}
