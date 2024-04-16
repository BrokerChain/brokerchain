import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Base } from "./base.js";
test("base", () => {
    const log = new Logger("test");
    const target = new Base();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<base></base>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
