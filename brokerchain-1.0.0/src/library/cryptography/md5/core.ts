// initialized by dev/system
import { Logger } from "../../../myutils/logger.js";
import { forge } from "../../node-forge/_/index.js";
import { Input, Output, Callback } from "./type.js";
export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const md5 = forge.md.md5.create();
    md5.update(input.text);

    return cb.ok({
        result: md5.digest().toHex()
    });
}
