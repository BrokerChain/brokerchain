import { Logger } from "../../../../../myutils/logger.js";
import { queue_all_load } from "./queue_all_load.js";
const log = new Logger("test");
queue_all_load(log, {
    ok: (data) => {
        console.log(data);
    },
    fail: (err) => {
        console.error(err);
    }
});
