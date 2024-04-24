// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { buffer_from } from "../_/buffer_from.js";
import { buffer_slice_batch } from "../_/buffer_slice_batch.js";

export function core<R>(plog: Logger, input: Input, cb: Callback<R>): R {
    const log = plog.sub("buffer.buffer-slice-batch");
    log.variable("input", input);
    try {
        const output: Output = {
            sliced_hex_list: []
        };

        const buffer = buffer_from(log, input.hex, "hex", {
            empty: (v) => v,
            ok: (v) => v,
            fail: (err) => {
                throw err;
            }
        });

        return buffer_slice_batch(
            log,
            {
                buffer,
                start: input.byte_start,
                part_list: input.byte_length_list.map((byte_length) => {
                    return {
                        length: byte_length,
                        cb: (v) => {
                            output.sliced_hex_list.push(v.toString("hex"));
                        }
                    };
                })
            },
            {
                ok: () => {
                    return cb.ok(output);
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
