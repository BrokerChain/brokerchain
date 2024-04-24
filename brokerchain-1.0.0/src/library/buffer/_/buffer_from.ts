import { Logger } from "../../../myutils/logger.js";

type Encoding = "hex" | "utf-8" | "base64";

// Buffer.from allows invalid input and this is an problem:
//   https://github.com/nodejs/node/issues/24722
// this function checks invalid input and refuses it.
export function buffer_from<R>(
    plog: Logger,
    v: string,
    encoding: Encoding,
    cb: {
        empty: (v: Buffer) => R;
        ok: (v: Buffer) => R;
        fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("buffer_from");

    try {
        const buff = Buffer.from(v, encoding);

        // FIXME check it (expensive)
        const temp = buff.toString(encoding);

        if (temp.toLowerCase() === v.toLowerCase()) {
            if (!buff.length) {
                return cb.empty(buff);
            } else {
                return cb.ok(buff);
            }
        } else {
            return cb.fail(log.new_error(`parse as ${encoding} failed: ${v}`));
        }
    } catch (err) {
        return cb.fail(err);
    }
}
