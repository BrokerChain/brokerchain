import { Logger } from "../../../myutils/logger.js";
import { hex_slice } from "./hex_slice.js";

// [NOTE]
// - does not check the hex text for performance reason
// - check the hex length and expect it to be even
// - if input buffer is empty (zero length), this function will fail
// this function is strict, it will check the start/end is in range
// and for empty buffer, there aren't valid values for start/end
// - if start === end, the slice result will be empty
export function hex_slice_batch<R>(
    plog: Logger,
    opts: {
        hex: string;
        byte_start: number;
        part_list: {
            byte_length: number;
            cb: (v: Buffer) => void;
        }[];
    },
    cb: {
        ok: (output: { total_byte_length: number; rest_hex: string }) => R;
        fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("hex_slice_batch");
    log.variable("opts", opts);

    try {
        const { hex, byte_start, part_list } = opts;

        part_list.forEach(({ byte_length }) => {
            if (!Number.isSafeInteger(byte_length)) {
                throw log.new_error("invalid byte_length: not safe integer");
            }
            if (byte_length < 0) {
                throw log.new_error("invalid byte_length: negtive");
            }
        });

        const total_byte_length = part_list
            .map((item) => item.byte_length)
            .reduce((prev_value, current_value) => {
                return prev_value + current_value;
            });

        if (hex.length < total_byte_length * 2) {
            throw log.new_error("fewer bytes than expected");
        }

        let current_byte_start = byte_start;
        for (const part of part_list) {
            hex_slice(
                log,
                {
                    hex,
                    byte_start: current_byte_start,
                    byte_end: current_byte_start + part.byte_length
                },
                {
                    empty: (v) => {
                        part.cb(v);
                        current_byte_start += part.byte_length;
                    },
                    ok: (v) => {
                        part.cb(v);
                        current_byte_start += part.byte_length;
                    },
                    fail: (err) => {
                        throw err;
                    }
                }
            );
        }

        return cb.ok({
            total_byte_length,
            rest_hex: hex.slice(current_byte_start * 2)
        });
    } catch (err) {
        return cb.fail(err);
    }
}
