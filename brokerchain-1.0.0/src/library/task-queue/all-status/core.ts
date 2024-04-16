// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as _ from "../_/index.js";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("task-queue.all-status");
    log.variable("input", input);
    const list = _.get_queue_list();
    return cb.ok({
        list: list.map((queue) => {
            return {
                id: queue.id,
                task_list: queue.task_list.map((item) => {
                    return {
                        id: item.id,
                        status: item.status
                    };
                })
            };
        })
    });
}
