import { Logger } from "../../../myutils/logger.js";
import { buffer_from } from "./buffer_from.js";

// [NOTE]
// - does not check the hex text for performance reason
// - check the hex length and expect it to be even
// - if input hex is empty (zero length), this function will fail
// this function is strict, it will check the byte_start/byte_end is in range
// and for empty hex, there aren't valid values for start/end
// - if start === end, the slice result will be empty
export function hex_slice<R>(
    plog: Logger,
    opts: {
        hex: string;
        byte_start: number; // offset of byte after hex is converted to buffer; NOT character offset of hex string
        byte_end: number; // see above
    },
    cb: {
        empty: (v: Buffer) => R;
        ok: (v: Buffer) => R;
        fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("hex_slice");
    log.variable("opts", opts);

    try {
        const { hex, byte_start, byte_end } = opts;
        if (!(hex.length % 2 === 0)) {
            throw log.new_error("invalid argument: hex length must be even");
        }
        const byte_length = hex.length / 2;
        if (!Number.isSafeInteger(byte_start)) {
            throw log.new_error("invalid argument: byte_start must be safe integer");
        }
        if (byte_start < 0) {
            throw log.new_error("invalid argument: byte_start can not be negtive");
        }
        if (byte_start > byte_length - 1) {
            throw log.new_error("invalid argument: byte_start out of range");
        }
        if (!Number.isSafeInteger(byte_end)) {
            throw log.new_error("invalid argument: byte_end must be safe integer");
        }
        if (byte_end < 0) {
            throw log.new_error("invalid argument: byte_end can not be negtive");
        }
        if (byte_end < byte_start) {
            throw log.new_error("invalid argument: byte_end can not be less than byte_start");
        }
        if (byte_end > byte_length) {
            throw log.new_error("invalid argument: byte_end out of range");
        }
        if (byte_end === byte_start) {
            return cb.empty(Buffer.alloc(0));
        } else {
            const start = byte_start * 2;
            const end = byte_end * 2;
            // log.variable("start", start);
            // log.variable("end", end);
            // log.variable("hex.length", hex.length);
            const sliced_hex = hex.slice(start, end);
            // log.variable("sliced_hex", sliced_hex);
            const sliced_buffer = buffer_from(log, sliced_hex, "hex", {
                empty: (v) => {
                    throw log.new_error("internal error: impossible status, check the code now");
                },
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            });
            // log.ok();
            return cb.ok(sliced_buffer);
        }
    } catch (err) {
        return cb.fail(err);
    }
}
