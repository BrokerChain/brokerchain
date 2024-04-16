import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Body } from "./body.js";
test("body", () => {
    const log = new Logger("test");
    const target = new Body();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<body></body>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
