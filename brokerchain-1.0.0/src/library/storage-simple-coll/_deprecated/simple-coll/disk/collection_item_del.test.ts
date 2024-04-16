import { jest } from "@jest/globals";
import { Logger } from "../../../../../myutils/logger.js";
import { collection_item_add } from "./collection_item_add.js";
import { collection_item_del } from "./collection_item_del.js";
test("single", async () => {
    const log = new Logger("test");
    const namespace = "test";
    const key = "b";
    const item = {
        id: "yoyo",
        text: "hello"
    };
    await collection_item_add(
        log,
        {
            namespace,
            key,
            item
        },
        {
            ok: () => {
                // ok
            },
            fail: (err) => {
                throw err;
            }
        }
    );
    await collection_item_del(
        log,
        {
            namespace,
            key,
            item_id: item.id
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
