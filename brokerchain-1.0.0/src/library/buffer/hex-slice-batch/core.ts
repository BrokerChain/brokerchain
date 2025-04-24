// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { hex_slice_batch } from "../_/hex_slice_batch.js";

export function core<R>(log: Logger, input: Input, cb: Callback<R>): R {
    const output: Output = {
        sliced_hex_list: [],
        rest_hex: ""
    };

    return hex_slice_batch(
        log,
        {
            hex: input.hex,
            byte_start: input.byte_start,
            part_list: input.byte_length_list.map((byte_length) => {
                return {
                    byte_length,
                    cb: (v) => {
                        output.sliced_hex_list.push(v.toString("hex"));
                    }
                };
            })
        },
        {
            ok: ({ rest_hex }) => {
                output.rest_hex = rest_hex;
                return cb.ok(output);
            },
            fail: (err) => {
                throw err;
            }
        }
    );
}
