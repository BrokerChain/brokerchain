// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as fs from "node:fs/promises";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    await fs.chmod(input.path, input.mode);
    return cb.ok({});
}
