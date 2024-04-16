import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Html } from "./html.js";
test("html", () => {
    const log = new Logger("test");
    const target = new Html();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<!DOCTYPE html><html></html>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
