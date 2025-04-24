// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { read_text_file } from "../../../myutils/node/file/read_text_file.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const text = await read_text_file(log, input.name, {
        ok: (text) => {
            return text;
        },
        fail: (err) => {
            throw err;
        }
    });

    return cb.ok({ text });
}
