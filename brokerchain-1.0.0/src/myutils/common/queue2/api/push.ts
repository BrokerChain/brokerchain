import { Queue, Task } from "../type/index.js";
import { Logger } from "../../../logger.js";
import { safe } from "../../syntax/index.js";
export function push(plog: Logger, queue: Queue, task: Task) {
    const log = plog.sub("queue.push");
    log.variable("task.id", task.id);
    log.println(`queue length from ${queue.pending.length} to ${queue.pending.length + 1}`);
    queue.pending.push(task);
    handle_next_task(log, queue);
}
function handle_next_task(plog: Logger, queue: Queue) {
    const log = plog.sub("handle_next_task");
    if (queue.working) {
        log.println("there is another working task already, this new one will be handled later");
        return;
    }
    if (queue.pending.length < 1) {
        log.println("there is no pending task now");
        return;
    }
    const task = queue.pending.shift();
    queue.working = task;
    const log_task = log.sub(task.id);
    log_task.println("begin");
    task.handle(task)
        .then(() => {
            log_task.println("finish");
            queue.working = null;
            handle_next_task(plog, queue);
        })
        .catch((err) => {
            log_task.error(err);
            queue.working = null;
            handle_next_task(plog, queue);
        });
}
