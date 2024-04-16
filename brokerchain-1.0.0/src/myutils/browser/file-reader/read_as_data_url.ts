import { Logger } from "../../logger.js";

export function read_as_data_url<R>(
    plog: Logger,
    file: File,
    cb: {
        ok: (text: string) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("read_as_data_url");
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
            const data_url = e.target.result;
            if (typeof data_url !== "string") {
                safe_resolve(() => cb.fail(log.new_error("unexpected content type: " + typeof data_url)));
            } else {
                safe_resolve(() => cb.ok(data_url));
            }
        };

        reader.onerror = (e) => {
            console.error(e);
            safe_resolve(() => cb.fail(log.new_error("read failed")));
        };

        reader.readAsDataURL(file);
    });
}
