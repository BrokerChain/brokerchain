import { jest } from "@jest/globals";
import { find } from "./find.js";
describe("find", () => {
    it("should not found", () => {
        find(
            {
                list: [] as string[],
                match: (item) => false
            },
            {
                ok: ({ current, prev, next }) => {
                    throw new Error("unexpected status");
                },
                not_found: () => {
                    // ok
                }
            }
        );
    });
    it("should not found", () => {
        find(
            {
                list: ["a"] as string[],
                match: (item) => false
            },
            {
                ok: ({ current, prev, next }) => {
                    throw new Error("unexpected status");
                },
                not_found: () => {
                    // ok
                }
            }
        );
    });
    it("should found: a", () => {
        find(
            {
                list: ["a"] as string[],
                match: (item) => item === "a"
            },
            {
                ok: ({ current, prev, next }) => {
                    expect(current.index).toStrictEqual(0);
                    expect(current.item).toStrictEqual("a");
                    expect(prev).toBeUndefined();
                    expect(next).toBeUndefined();
                },
                not_found: () => {
                    throw new Error("unexpected status");
                }
            }
        );
    });
    it("should found: a", () => {
        find(
            {
                list: ["a", "b"] as string[],
                match: (item) => item === "a"
            },
            {
                ok: ({ current, prev, next }) => {
                    expect(current.index).toStrictEqual(0);
                    expect(current.item).toStrictEqual("a");
                    expect(prev).toBeUndefined();
                    expect(next.index).toStrictEqual(1);
                    expect(next.item).toStrictEqual("b");
                },
                not_found: () => {
                    throw new Error("unexpected status");
                }
            }
        );
    });
    it("should found: b", () => {
        find(
            {
                list: ["a", "b"] as string[],
                match: (item) => item === "b"
            },
            {
                ok: ({ current, prev, next }) => {
                    expect(current.index).toStrictEqual(1);
                    expect(current.item).toStrictEqual("b");
                    expect(prev.index).toStrictEqual(0);
                    expect(prev.item).toStrictEqual("a");
                    expect(next).toBeUndefined();
                },
                not_found: () => {
                    throw new Error("unexpected status");
                }
            }
        );
    });
    it("should found: b", () => {
        find(
            {
                list: ["a", "b", "c"] as string[],
                match: (item) => item === "b"
            },
            {
                ok: ({ current, prev, next }) => {
                    expect(prev.index).toStrictEqual(0);
                    expect(prev.item).toStrictEqual("a");
                    expect(current.index).toStrictEqual(1);
                    expect(current.item).toStrictEqual("b");
                    expect(next.index).toStrictEqual(2);
                    expect(next.item).toStrictEqual("c");
                },
                not_found: () => {
                    throw new Error("unexpected status");
                }
            }
        );
    });
});
