import { Logger } from "../../logger.js";

export function read_as_array_buffer<R>(
    plog: Logger,
    file: File,
    cb: {
        ok: (array_buffer: ArrayBuffer) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("read_as_array_buffer");
    return new Promise((resolve, reject) => {
        const safe_resolve = (exp: () => R) => {
            try {
                resolve(exp());
            } catch (err) {
                reject(err);
            }
        };

        const reader = new FileReader();

        reader.onload = (e) => {
            const array_buffer = e.target.result;

            if (typeof array_buffer === "string") {
                safe_resolve(() => cb.fail(log.new_error("unexpected content type: " + typeof array_buffer)));
            } else {
                safe_resolve(() => cb.ok(array_buffer));
            }
        };

        reader.onerror = (e) => {
            console.error(e);
            safe_resolve(() => cb.fail(log.new_error("read failed")));
        };

        reader.readAsArrayBuffer(file);
    });
}
