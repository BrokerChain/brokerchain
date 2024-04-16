import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Style } from "./style.js";
test("style", () => {
    const log = new Logger("test");
    const target = new Style();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<style></style>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
