import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Head } from "./head.js";
test("head", () => {
    const log = new Logger("test");
    const target = new Head();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<head></head>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
