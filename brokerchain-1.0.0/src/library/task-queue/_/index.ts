import { Logger } from "../../../myutils/logger.js";
import { guid } from "../../../myutils/common/guid.js";
import { queue_cycle } from "../queue-cycle/export.js";

type TaskStatus = "pending" | "running"; //  | "ok" | "fail";

type TaskFun = (plog: Logger) => Promise<void>;

export interface Task {
    id: string;
    status: TaskStatus;
    run: TaskFun;
    done_cb_list: (() => void)[];
}

export interface Queue {
    id: string;
    task_list: Task[];
}

export const queue_map = new Map<string, Queue>();

export function get_queue_list(): Queue[] {
    const list: Queue[] = [];
    for (const [id, queue] of queue_map) {
        list.push(queue);
    }
    return list;
}

export function get_or_create_queue(opts: { id: string }): Queue {
    const { id } = opts;
    const queue = queue_map.get(id);
    if (queue) {
        return queue;
    } else {
        const new_queue: Queue = { id, task_list: [] };
        queue_map.set(id, new_queue);
        return new_queue;
    }
}

export function get_queue<R>(
    plog: Logger,
    opts: { id: string },
    cb: {
        none: () => R;
        ok: (queue: Queue) => R;
        // fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("get_queue");
    log.variable("opts", opts);

    const queue = queue_map.get(opts.id);
    if (!queue) {
        return cb.none();
    } else {
        return cb.ok(queue);
    }
}

export function get_task<R>(
    plog: Logger,
    opts: { queue_id: string; task_id: string },
    cb: {
        none: () => R;
        ok: (task: Task) => R;
        // fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("get_task");
    log.variable("opts", opts);
    const { queue_id, task_id } = opts;

    return get_queue(
        log,
        { id: queue_id },
        {
            none: () => {
                return cb.none();
            },
            ok: (queue) => {
                const task = queue.task_list.find((item) => item.id === task_id);
                if (task) {
                    return cb.ok(task);
                } else {
                    return cb.none();
                }
            }
        }
    );
}

export function add_task<R>(
    plog: Logger,
    opts: { queue_id: string; run: TaskFun },
    cb: {
        ok: (task: Task) => R;
        fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("add_task");
    log.variable("opts", opts);
    const { queue_id, run } = opts;

    const queue = queue_map.get(queue_id);
    if (queue) {
        const task: Task = {
            id: guid(),
            status: "pending",
            run,
            done_cb_list: []
        };
        log.variable("task", task);
        queue.task_list.push(task);
        return cb.ok(task);
    } else {
        const new_queue: Queue = {
            id: queue_id,
            task_list: []
        };
        queue_map.set(queue_id, new_queue);
        const task: Task = {
            id: guid(),
            status: "pending",
            run,
            done_cb_list: []
        };
        log.variable("task", task);
        new_queue.task_list.push(task);
        return cb.ok(task);
    }
}

export function notify_task_done(plog: Logger, task: Task) {
    const log = plog.sub("notify_task_done");
    for (const cb of task.done_cb_list) {
        try {
            cb();
        } catch (err) {
            log.warn("invoking task.done_cb_list throwed an error");
            log.print_unknown_error(err);
        }
    }
}

let queue_cycle_count = 0;

export function notify_queue_cycle(plog: Logger, opts: { queue_id: string }) {
    const log = plog.sub("notify_queue_cycle").sub(queue_cycle_count.toString());
    queue_cycle_count += 1;
    log.println("invoke queue_cycle at next promise...");
    new Promise((resolve) => {
        log.warn("promise arrive, do the work");
        queue_cycle(
            log,
            { queue_id: opts.queue_id },
            {
                ok: () => {
                    // ignore
                    resolve({});
                    log.ok();
                },
                fail: (err) => {
                    resolve({});
                    log.fail();
                }
            }
        );
    });
}

// export function notify_queue_cycle(plog: Logger, opts: { queue_id: string }) {
//     const log = plog
//         .sub("notify_queue_cycle")
//         .sub(queue_cycle_count.toString());
//     queue_cycle_count += 1;
//     log.println("invoke queue_cycle at next tick...");
//     process.nextTick(() => {
//         log.warn("tick arrive, do the work");
//         queue_cycle(
//             log,
//             { queue_id: opts.queue_id },
//             {
//                 ok: () => {
//                     // ignore
//                     log.ok();
//                 },
//                 fail: (err) => {
//                     log.fail();
//                 }
//             }
//         );
//     });
// }
