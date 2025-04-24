// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { file_exist } from "../file-exist/export.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    assert_clean_name(input.name_from, "invalid name_from");
    assert_clean_name(input.name_to, "invalid name_to");

    const full_name_from = path.resolve(input.base_path, input.name_from);
    const full_name_to = path.resolve(input.base_path, input.name_to);

    await file_exist(
        log,
        {
            name: full_name_from
        },
        {
            none: () => {
                throw log.new_error("file not found: " + full_name_from);
            },
            ok: (output) => {
                return output;
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await file_exist(
        log,
        {
            name: full_name_to
        },
        {
            none: () => {
                // ok
            },
            ok: (output) => {
                throw log.new_error("file exists already: " + full_name_to);
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await fs.rename(full_name_from, full_name_to);

    return cb.ok({});

    // FIXME more strict file name check
    function assert_clean_name(v: string, error_message: string) {
        const ok = v && path.basename(v) === v;
        if (!ok) {
            throw log.new_error(error_message);
        }
    }
}
