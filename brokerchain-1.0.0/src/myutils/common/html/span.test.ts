import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Span } from "./span.js";
test("span", () => {
    const log = new Logger("test");
    const target = new Span();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<span></span>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
