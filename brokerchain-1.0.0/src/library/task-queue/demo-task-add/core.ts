// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { task_add } from "../task-add/export.js";
import { sleep } from "../../../myutils/index.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("task-queue.demo-task-add");
    log.variable("input", input);

    const queue_id = input.queue_id;

    let run: () => Promise<void> = () => {
        return Promise.resolve();
    };

    switch (input.mode) {
        case "resolve":
            // nothing to do
            break;
        case "15s-resolve":
            run = async () => {
                await sleep(15);
            };
            break;
        case "reject":
            run = () => {
                return Promise.reject("mode: reject");
            };
            break;
        case "15s-reject":
            run = async () => {
                await sleep(15);
                throw new Error("mode: 15s-reject");
            };
            break;
        case "infinite":
            run = () => {
                return new Promise(() => {
                    // never return, infinite
                });
            };
            break;
        default:
            throw log.new_error("unknown mode");
    }

    return await task_add(
        log,
        {
            queue_id,
            run
        },
        {
            ok: ({ task_id }) => {
                return cb.ok({
                    task_id
                });
            },
            fail: (err) => {
                return cb.fail(err);
            }
        }
    );
}
