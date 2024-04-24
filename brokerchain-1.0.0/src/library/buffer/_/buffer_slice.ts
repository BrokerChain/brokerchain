import { Logger } from "../../../myutils/logger.js";

// [NOTE]
// - if input buffer is empty (zero length), this function will fail
// this function is strict, it will check the start/end is in range
// and for empty buffer, there aren't valid values for start/end
// - if start === end, the slice result will be empty
export function buffer_slice<R>(
    plog: Logger,
    opts: {
        buffer: Buffer;
        start: number;
        end: number;
    },
    cb: {
        empty: (v: Buffer) => R;
        ok: (v: Buffer) => R;
        fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("buffer_slice");

    try {
        const { buffer, start, end } = opts;
        if (!Number.isSafeInteger(start)) {
            throw log.new_error("invalid argument: start must be safe integer");
        }
        if (start < 0) {
            throw log.new_error("invalid argument: start can not be negtive");
        }
        if (start > buffer.length - 1) {
            throw log.new_error("invalid argument: start out of range");
        }
        if (!Number.isSafeInteger(end)) {
            throw log.new_error("invalid argument: end must be safe integer");
        }
        if (end < 0) {
            throw log.new_error("invalid argument: end can not be negtive");
        }
        if (end < start) {
            throw log.new_error("invalid argument: end can not be less than start");
        }
        if (end > buffer.length) {
            throw log.new_error("invalid argument: end out of range");
        }
        if (end === start) {
            return cb.empty(Buffer.alloc(0));
        } else {
            return cb.ok(buffer.slice(start, end));
        }
    } catch (err) {
        return cb.fail(err);
    }
}
