import { jest } from "@jest/globals";
import { Logger } from "../../../myutils/logger.js";
import { guid } from "../../../myutils/common/guid.js";
import { collection_item_add } from "./export.js";
import { cache_obj } from "../_cache/index.js";

const log = new Logger("test");

describe("collection-item-add: check cache", () => {
    it("should be ok", async () => {
        const namespace = `test_${new Date().valueOf()}`;
        const key = "box";
        const item_id = guid();
        expect(cache_obj[namespace]).toBeUndefined();
        await collection_item_add(
            log,
            {
                namespace,
                key,
                item: {
                    id: item_id
                }
            },
            {
                ok: () => {
                    console.log(cache_obj[namespace]);
                    expect(cache_obj[namespace]).not.toBeUndefined();
                    expect(cache_obj[namespace][key]).not.toBeUndefined();
                    expect(cache_obj[namespace][key].items.length).toStrictEqual(1);
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    });
});
