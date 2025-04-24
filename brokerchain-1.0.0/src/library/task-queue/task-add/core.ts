// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as _ from "../_/index.js";

export async function core<R>(
    log: Logger,
    input: Input & {
        run?: (plog: Logger) => Promise<void>;
    },
    cb: Callback<R>
): Promise<R> {
    try {
        let run = input.run;
        if (!run) {
            log.warn("the task does have 'run' function, provides a default one");
            run = (plog) => {
                return Promise.resolve();
            };
        }

        const task = _.add_task(
            log,
            {
                queue_id: input.queue_id,
                run
            },
            {
                ok: (task) => {
                    _.notify_queue_cycle(log, { queue_id: input.queue_id }); // important
                    return task;
                },
                fail: (err) => {
                    throw err;
                }
            }
        );

        log.variable("task_id", task.id);
        return cb.ok({
            task_id: task.id
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
