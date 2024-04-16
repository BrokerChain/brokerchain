import { Logger } from "../../logger.js";

export function read_as_text<R>(
    plog: Logger,
    file: File,
    cb: {
        ok: (text: string) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("read_as_text");
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
            const text = e.target.result;
            if (typeof text !== "string") {
                safe_resolve(() => cb.fail(log.new_error("unexpected content type: " + typeof text)));
            } else {
                safe_resolve(() => cb.ok(text));
            }
        };

        reader.onerror = (e) => {
            console.error(e);
            safe_resolve(() => cb.fail(log.new_error("read failed")));
        };

        reader.readAsText(file);
    });
}
