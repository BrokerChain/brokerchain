import { Logger } from "../../../myutils/logger.js";
import { hex_slice } from "./hex_slice.js";

export function hex_concat_batch<R>(
    plog: Logger,
    opts: {
        part_list: {
            byte_length: number;
            cb: (v: Buffer) => void;
        }[];
    },
    cb: {
        ok: (output: { total_byte_length: number; hex: string }) => R;
        fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("hex_concat_batch");
    log.variable("opts", opts);

    try {
        const { part_list } = opts;

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

        const buffer = Buffer.alloc(total_byte_length);

        let start = 0;
        for (const part of part_list) {
            const end = start + part.byte_length;
            part.cb(buffer.slice(start, end)); // sliced buffer is just a reference to the original buffer
            start = end;
        }

        return cb.ok({
            total_byte_length,
            hex: buffer.toString("hex")
        });
    } catch (err) {
        return cb.fail(err);
    }
}
