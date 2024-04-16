import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Script } from "./script.js";
test("script", () => {
    const log = new Logger("test");
    const target = new Script();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<script></script>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
