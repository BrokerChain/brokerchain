import { jest } from "@jest/globals";
import { Logger } from "../logger.js";
import { parse_anchor, make_anchor } from "./anchor.js";
const log = new Logger("test");
describe("make_anchor", () => {
    it("should be ok", () => {
        const str = make_anchor(log, { head_id: "", tail_id: "" });
        expect(str).toStrictEqual(`["",""]`);
    });
    it("should be ok", () => {
        const str = make_anchor(log, { head_id: "a", tail_id: "b" });
        expect(str).toStrictEqual(`["a","b"]`);
    });
});
describe("parse_anchor", () => {
    it("should be ok", () => {
        parse_anchor(log, "", {
            none: () => {
                // ok
            },
            ok: (anchor) => {
                throw new Error("unexpected");
            },
            fail: (err) => {
                throw err;
            }
        });
    });
    it("should be ok", () => {
        parse_anchor(log, `["",""]`, {
            none: () => {
                throw new Error("unexpected");
            },
            ok: (anchor) => {
                expect(anchor.head_id).toStrictEqual("");
                expect(anchor.tail_id).toStrictEqual("");
            },
            fail: (err) => {
                throw err;
            }
        });
    });
    it("should be ok", () => {
        parse_anchor(log, `["a","b"]`, {
            none: () => {
                throw new Error("unexpected");
            },
            ok: (anchor) => {
                expect(anchor.head_id).toStrictEqual("a");
                expect(anchor.tail_id).toStrictEqual("b");
            },
            fail: (err) => {
                throw err;
            }
        });
    });
});
