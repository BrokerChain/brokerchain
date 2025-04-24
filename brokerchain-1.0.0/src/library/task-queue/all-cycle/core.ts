// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import * as _ from "../_/index.js";
import { queue_cycle } from "../queue-cycle/export.js";

// actually each queue will drive itself automatically and this function is never invoked
// but I created this function for dev purpose and invoke this function is not harmful
export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const queue_list = _.get_queue_list();

    for (const queue of queue_list) {
        // [important-1]
        // don't await here, cycle different queue at the same time
        // [important-2]
        queue_cycle(
            log,
            {
                queue_id: queue.id
            },
            {
                ok: () => {
                    // ignore
                },
                fail: (err) => {
                    log.warn(err);
                }
            }
        );
    }

    return cb.ok({});
}
