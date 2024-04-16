import { Logger } from "../../logger.js";
import * as json from "../../common/json/index.js";
import { write_file } from "./write_file.js";
interface Callback<T> {
    ok: () => T;
    fail: (error: Error) => T;
}
export async function write_json_file<T>(plog: Logger, name: string, content: any, cb: Callback<T>): Promise<T> {
    const log = plog.sub("write_json_file");
    log.variable("name", name);
    // log.variable("content", content);
    const result = await json.stringify_pretty(log, content, {
        ok: async (text) => {
            log.println(`stringify content ok, text length: ${text.length}`);
            return await write_file(log, name, text, {
                ok: () => {
                    return cb.ok();
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            });
        },
        fail: async (err) => {
            return cb.fail(err);
        }
    });
    return result;
}
