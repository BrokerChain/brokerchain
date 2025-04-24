// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { file_read_text } from "../file-read-text/export.js";
import { file_write_text } from "../file-write-text/export.js";

export async function core<R>(
    log: Logger,
    input: Input & {
        replace_callback?: (text: string) => string;
    },
    cb: Callback<R>
): Promise<R> {
    if (!input.replace_callback) {
        return cb.skip();
    }

    const { text } = await file_read_text(
        log,
        {
            name: input.name
        },
        {
            ok: (output) => {
                return output;
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    const new_text = input.replace_callback(text);

    if (new_text === text) {
        return cb.skip();
    }

    await file_write_text(
        log,
        {
            name: input.name,
            text: new_text
        },
        {
            ok: (output) => {
                return output;
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    return cb.ok({});
}
