import { Queue, Task } from "../type/index.js";
import { Logger } from "../../../logger.js";
import { push } from "./push.js";
let next_id = 0;
export function create(plog: Logger) {
    const log = plog.sub("queue.create");
    log.ok();
    const queue: Queue = {
        working: null,
        pending: []
    };
    return {
        add: <T, R>(plog: Logger, data: T, handle: (data: T) => R): Promise<R> => {
            return new Promise<R>((resolve, reject) => {
                const task: Task = {
                    id: next_id.toString(),
                    handle: async (task) => {
                        try {
                            const ret = await handle(data);
                            resolve(ret);
                        } catch (err) {
                            reject(err);
                            return;
                        }
                    }
                };
                next_id++;
                push(plog, queue, task);
            });
        }
    };
}
