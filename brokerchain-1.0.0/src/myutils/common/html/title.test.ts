import { jest } from "@jest/globals";
import { Logger } from "../../logger.js";
import { Title } from "./title.js";
test("title", () => {
    const log = new Logger("test");
    const target = new Title();
    target.to_text(log, {
        ok: (text) => {
            expect(text).toStrictEqual("<title></title>");
        },
        fail: (err) => {
            throw err;
        }
    });
});
