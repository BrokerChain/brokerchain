// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { task_add } from "../task-add/export.js";
import { task_wait } from "../task-wait/export.js";

export async function core<R>(
    log: Logger,
    input: Input & {
        run?: (plog: Logger) => Promise<void>;
    },
    cb: Callback<R>
): Promise<R> {
    log.println("add task...");
    return await task_add(
        log,
        {
            queue_id: input.queue_id,
            run: input.run
        },
        {
            ok: async ({ task_id }) => {
                log.println("add task ok, waiting execution...");
                return await task_wait(
                    log,
                    { queue_id: input.queue_id, task_id },
                    {
                        ok: () => {
                            log.println("task wait ok, job done");
                            return cb.ok({ task_id });
                        },
                        fail: (err) => {
                            log.println("task wait fail");
                            return cb.fail(err);
                        }
                    }
                );
            },
            fail: async (err) => {
                log.println("add task fail");
                return cb.fail(err);
            }
        }
    );
}
