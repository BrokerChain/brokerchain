// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as _ from "../_/index.js";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    return _.get_queue(
        log,
        { id: input.queue_id },
        {
            none: () => {
                return cb.ok({
                    id: input.queue_id,
                    task_list: []
                });
            },
            ok: (queue) => {
                return cb.ok({
                    id: queue.id,
                    task_list: queue.task_list.map((item) => {
                        return {
                            id: item.id,
                            status: item.status
                        };
                    })
                });
            }
            // fail: (err) => {
            //     return cb.fail(err);
            // }
        }
    );
}
