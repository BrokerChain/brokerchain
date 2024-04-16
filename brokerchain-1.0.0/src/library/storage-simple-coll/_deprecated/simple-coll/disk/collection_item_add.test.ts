import { jest } from "@jest/globals";
import { Logger } from "../../../../../myutils/logger.js";
import { collection_item_add } from "./collection_item_add.js";
test("single", async () => {
    const log = new Logger("test");
    await collection_item_add(
        log,
        {
            namespace: "test",
            key: "a",
            item: {
                id: "yoyo",
                text: "blabla"
            }
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );
});
