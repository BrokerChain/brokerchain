// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { directory_create } from "../directory-create/export.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const from_filename_abs = path.resolve(input.from);
    const to_filename_abs = path.resolve(input.to);

    log.variable("from_filename_abs", from_filename_abs);
    log.variable("to_filename_abs", to_filename_abs);

    const to_dirname_abs = path.dirname(to_filename_abs);
    log.variable("to_dirname_abs", to_dirname_abs);

    // create the parent directories if needed

    await directory_create(
        log,
        {
            name: to_dirname_abs
        },
        {
            skip: () => {
                // ignore
            },
            ok: (output) => {
                return output;
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    // ok, ready to copy

    await fs.copyFile(from_filename_abs, to_filename_abs);
    return cb.ok({});
}
