import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { A } from "./a.js";
test("a", () => {
    const log = new Logger("test");
    const target = new A();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<a></a>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
