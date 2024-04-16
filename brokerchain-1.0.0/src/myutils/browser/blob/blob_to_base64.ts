import { Logger } from "../../logger.js";

export function blob_to_base64<R>(
    plog: Logger,
    blob: Blob,
    cb: {
        ok: (base64_text: string) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("blob_to_base64");

    return new Promise<R>((resolve, reject) => {
        const reader = new FileReader();

        const safe_resolve = (exp: () => R) => {
            try {
                resolve(exp());
            } catch (err) {
                reject(err);
            }
        };

        reader.onload = () => {
            if (typeof reader.result !== "string") {
                safe_resolve(() => cb.fail(log.new_error("unexpected content type: " + typeof reader.result)));
            } else {
                const base64_text = reader.result.split(",")[1];
                safe_resolve(() => cb.ok(base64_text));
            }
        };

        reader.onerror = (e) => {
            console.error(e);
            safe_resolve(() => cb.fail(log.new_error("read failed")));
        };

        reader.readAsDataURL(blob);
    });
}
