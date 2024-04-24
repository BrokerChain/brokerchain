// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.cipher-algorithm-list");
    log.variable("input", input);
    const output: Output = {
        list: crypto.getCiphers()
    };
    log.variable("output", output);
    return cb.ok(output);
}
