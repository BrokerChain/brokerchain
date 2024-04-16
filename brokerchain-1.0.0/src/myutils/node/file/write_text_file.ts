import { Logger } from "../../logger.js";
import { write_file } from "./write_file.js";
interface Callback<T> {
    ok: () => T;
    fail: (error: Error) => T;
}
export function write_text_file<T>(plog: Logger, name: string, text: string, cb: Callback<T>): Promise<T> {
    const log = plog.sub("write_text_file");
    log.variable("name", name);
    // log.variable("text", text);
    return write_file(log, name, text, {
        ok: () => {
            log.ok();
            return cb.ok();
        },
        fail: (err) => {
            log.fail();
            return cb.fail(err);
        }
    });
}
