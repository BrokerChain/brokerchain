import { Logger } from "../../../myutils/logger.js";
import { buffer_slice } from "./buffer_slice.js";

// [NOTE]
// - if input buffer is empty (zero length), this function will fail
// this function is strict, it will check the start/end is in range
// and for empty buffer, there aren't valid values for start/end
// - if start === end, the slice result will be empty
export function buffer_slice_batch<R>(
    plog: Logger,
    opts: {
        buffer: Buffer;
        start: number;
        part_list: {
            length: number;
            cb: (v: Buffer) => void;
        }[];
    },
    cb: {
        ok: () => R;
        fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("buffer_slice_batch");

    try {
        const { buffer, start, part_list } = opts;

        part_list.forEach(({ length }) => {
            if (!Number.isSafeInteger(length)) {
                throw log.new_error("invalid length: not safe integer");
            }
            if (length < 0) {
                throw log.new_error("invalid length: negtive");
            }
        });

        let current_start = start;
        for (const part of part_list) {
            buffer_slice(
                log,
                {
                    buffer,
                    start: current_start,
                    end: current_start + part.length
                },
                {
                    empty: (v) => {
                        part.cb(v);
                        current_start += part.length;
                    },
                    ok: (v) => {
                        part.cb(v);
                        current_start += part.length;
                    },
                    fail: (err) => {
                        throw err;
                    }
                }
            );
        }

        return cb.ok();
    } catch (err) {
        return cb.fail(err);
    }
}
