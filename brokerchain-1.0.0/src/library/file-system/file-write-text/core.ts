// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { write_text_file } from "../../../myutils/node/file/write_text_file.js";
import { Input, Output, Callback } from "./type.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    await write_text_file(log, input.name, input.text, {
        ok: () => {
            // ignore
        },
        fail: (err) => {
            throw err;
        }
    });

    return cb.ok({});
}
