// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as _ from "../_/index.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("task-queue.task-wait");
    log.variable("input", input);

    return new Promise((resolve, reject) => {
        _.get_task(
            log,
            { queue_id: input.queue_id, task_id: input.task_id },
            {
                none: () => {
                    try {
                        resolve(cb.fail(log.new_error("not found")));
                    } catch (err) {
                        reject(err);
                    }
                },
                ok: (task) => {
                    log.println("waiting...");
                    task.done_cb_list.push(() => {
                        log.println("task done");
                        try {
                            resolve(cb.ok({}));
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            }
        );
    });
}
