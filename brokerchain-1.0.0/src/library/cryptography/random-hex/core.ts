// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as crypto from "node:crypto";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("cryptography.random-hex");
    log.variable("input", input);
    try {
        return cb.ok({
            hex: crypto.randomBytes(input.bytes).toString("hex")
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
