import { Logger } from "../../../logger.js";
import { sleep } from "../../../index.js";
import * as queue from "../index.js";
const log = new Logger("invoke");
test();
async function test() {
    const q = queue.create(new Logger("demo"));
    await q.add(log, {}, async (_) => {
        console.log("task1");
        await sleep(1);
    });
    await q.add(log, {}, async (_) => {
        console.log("task2");
        await sleep(1);
    });
}
