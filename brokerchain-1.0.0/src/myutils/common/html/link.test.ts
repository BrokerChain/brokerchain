import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Link } from "./link.js";
test("link", () => {
    const log = new Logger("test");
    const target = new Link();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<link>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
