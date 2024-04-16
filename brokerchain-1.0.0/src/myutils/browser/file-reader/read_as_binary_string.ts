import { Logger } from "../../logger.js";

export function read_as_binary_string<R>(
    plog: Logger,
    file: File,
    cb: {
        ok: (text: string) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("read_as_binary_string");
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
            const binary_string = e.target.result;
            if (typeof binary_string !== "string") {
                safe_resolve(() => cb.fail(log.new_error("unexpected content type: " + typeof binary_string)));
            } else {
                safe_resolve(() => cb.ok(binary_string));
            }
        };

        reader.onerror = (e) => {
            console.error(e);
            safe_resolve(() => cb.fail(log.new_error("read failed")));
        };

        reader.readAsBinaryString(file);
    });
}
