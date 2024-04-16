import { jest } from "@jest/globals";
import { Logger } from "../../../myutils/logger.js";
import { queue_add } from "./index.js";

const log = new Logger("test");

describe("simple-function: return a value", () => {
    it("should be ok", async () => {
        const value = await queue_add(log, async () => {
            return 100;
        });
        expect(value).toStrictEqual(100);
    });
});

describe("simple-function: throw an error", () => {
    it("should be ok", async () => {
        let throwed_error: Error | undefined = undefined;
        try {
            await queue_add(log, async () => {
                throw new Error("something wrong");
            });
            // should never reach this line
            expect(1).toStrictEqual(2);
        } catch (err) {
            throwed_error = err;
        }
        expect(throwed_error).not.toBeUndefined();
    });
});
