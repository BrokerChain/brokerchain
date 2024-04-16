// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as _ from "../_/index.js";
import { queue_run } from "../queue-run/export.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("task-queue.queue-cycle");
    log.variable("input", input);

    try {
        log.println("begin loop...");
        for (let i = 0; true; ++i) {
            log.variable("i", i);
            log.println("run queue: ", input.queue_id);
            const end_loop: boolean = await queue_run(
                log,
                {
                    queue_id: input.queue_id
                },
                {
                    empty: () => {
                        log.println("empty");
                        return true;
                    },
                    running_already: () => {
                        log.println("running_already");
                        return true;
                    },
                    ok: () => {
                        log.println("ok");
                        return false;
                    },
                    fail: (err) => {
                        log.println("fail");
                        // this is not fail about the task execution,
                        // but something internal failure unexpected
                        // stop now
                        throw err;
                    }
                }
            );

            log.variable("end_loop", end_loop);
            if (end_loop) {
                break;
            }
        }

        log.println("end loop");
        return cb.ok({});
    } catch (err) {
        log.print_unknown_error(err);
        log.println("end loop, with error");
        return cb.fail(err);
    }
}
