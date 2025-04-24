// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { buffer_from } from "../../buffer/_/buffer_from.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const buff = await buffer_from(log, input.hex, "hex", {
        empty: (output) => output,
        ok: (output) => {
            return output;
        },
        fail: (err) => {
            throw err;
        }
    });

    const base_dir = path.dirname(input.name);
    await fs.mkdir(base_dir, { recursive: true });
    await fs.writeFile(input.name, buff);

    return cb.ok({});
}
