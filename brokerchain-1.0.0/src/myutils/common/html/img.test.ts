import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Img } from "./img.js";
test("img", () => {
    const log = new Logger("test");
    const target = new Img();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<img>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
