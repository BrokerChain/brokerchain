import { jest } from "@jest/globals";
import { Logger } from "../../../logger.js";
import * as q from "../index.js";
test("create", () => {
    const queue = q.create(new Logger("test"));
});
test("single:ok", async () => {
    const log = new Logger("single");
    const queue = q.create(log);
    const ret = await queue.add(log, "ping", async (data) => {
        expect(data).toStrictEqual("ping");
        return "pong";
    });
    expect(ret).toStrictEqual("pong");
});
test("single:fail", async () => {
    const log = new Logger("single:fail");
    const queue = q.create(log);
    try {
        await queue.add(log, "ping", async (data) => {
            expect(data).toStrictEqual("ping");
            throw new Error("something wrong");
        });
    } catch (err) {
        // ok, ignore
    }
});
test("two:fail-ok", async () => {
    const log = new Logger("two:fail-ok");
    const queue = q.create(log);
    try {
        await queue.add(log, "ping", async (data) => {
            expect(data).toStrictEqual("ping");
            throw new Error("something wrong");
        });
    } catch (err) {
        // ignore
    }
    const ret = await queue.add(log, "ping2", async (data) => {
        expect(data).toStrictEqual("ping2");
        return "pong2";
    });
    expect(ret).toStrictEqual("pong2");
});
