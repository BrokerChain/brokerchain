import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Meta } from "./meta.js";
test("meta", () => {
    const log = new Logger("test");
    const target = new Meta();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<meta>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
