import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Div } from "./div.js";
test("div", () => {
    const log = new Logger("test");
    const target = new Div();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<div></div>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
