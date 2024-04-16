import { Logger } from "../logger.js";
import * as os from "node:os";

export function add_exe_on_windows(plog: Logger, file: string): string {
    const log = plog.sub("add_exe_on_windows");

    log.variable("file", file);
    const is_windows = os.platform() === "win32";
    log.variable("is_windows", is_windows);
    let result = file;

    if (is_windows) {
        if (file && /\.exe^/i.test(file) === false) {
            const file_with_exe = file + ".exe";
            log.warn("auto fix the file name without .exe on windows platform");
            log.warn(`file changed from: ${JSON.stringify(file)} to ${JSON.stringify(file_with_exe)}`);
            result = file_with_exe;
        } else {
            log.warn("no fix applied, because the name pattern is unexpected");
        }
    }

    log.variable("result", result);
    return result;
}
