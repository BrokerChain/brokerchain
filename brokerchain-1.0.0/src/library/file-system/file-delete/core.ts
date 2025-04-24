// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as fs from "node:fs/promises";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    try {
        await fs.access(input.name, fs.constants.F_OK);
    } catch (err) {
        return cb.none();
    }

    await fs.unlink(input.name);

    return cb.ok({});
}
