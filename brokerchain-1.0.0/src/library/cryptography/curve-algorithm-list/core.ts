// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const output: Output = {
        list: crypto.getCurves()
    };
    return cb.ok(output);
}
