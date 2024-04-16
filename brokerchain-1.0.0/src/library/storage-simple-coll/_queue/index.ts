import { Logger } from "../../../myutils/logger.js";
import { task_add_wait } from "../../task-queue/export.js";

const queue_id = "storage-simple-coll";

// [dangerous] Dining Philosophers problem
// keep the fun callback simple. don't invoke anything you not sure inside the fun.
// it's possible to create task inside another task and the whole queue hands
export function queue_add<R>(plog: Logger, fun: () => Promise<R>): Promise<R> {
    const log = plog.sub("queue_add");
    return new Promise((resolve, reject) => {
        let fun_result: R | undefined = undefined;
        let fun_error: Error | undefined = undefined;

        log.println("add task and wait...");
        task_add_wait(
            log.enable(false), // silent by default
            {
                queue_id,
                run: async (plog) => {
                    const log = plog.sub("run");
                    log.println("try run...");
                    try {
                        fun_result = await fun();
                        log.println("done");
                    } catch (err) {
                        log.error(err);
                        fun_error = err;
                    }
                }
            },
            {
                ok: () => {
                    if (fun_error) {
                        log.println("task over with error");
                        reject(fun_error);
                    } else {
                        log.println("task over ok");
                        resolve(fun_result);
                    }
                },
                fail: (err) => {
                    log.println("task over");
                    reject(err);
                }
            }
        );
    });
}
