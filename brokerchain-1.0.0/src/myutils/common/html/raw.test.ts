import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Raw2 } from "./raw.js";
test("raw", () => {
    const log = new Logger("test");
    const target = new Raw2();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("");
        },
        fail: (err) => {
            throw err;
        }
    });
});
