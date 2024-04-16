// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as _ from "../_/index.js";
import { Queue } from "../_/index.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("task-queue.queue-run");
    log.variable("input", input);

    try {
        const queue: Queue | null = _.get_queue(
            log,
            { id: input.queue_id },
            {
                none: () => {
                    return null; // it's ok
                },
                ok: (queue) => {
                    return queue;
                }
                // fail: (err) => {
                //     throw err;
                // }
            }
        );

        if (!queue || queue.task_list.length === 0) {
            log.println("empty");
            return cb.empty();
        }

        const task = queue.task_list[0];

        log.variable("task.status", task.status);

        if (task.status === "running") {
            log.println("running_already");
            return cb.running_already();
        }

        task.status = "running";

        const task_log = log.sub(`task-${task.id}`);
        try {
            task_log.println("begin");
            await task.run(task_log);
            task_log.println("end, ok");
        } catch (err) {
            log.print_unknown_error(err);
            task_log.println("end, fail");
            // yes task running fail is ok, just keep going
        }

        queue.task_list = queue.task_list.slice(1);
        _.notify_task_done(log, task);
        return cb.ok({});
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
