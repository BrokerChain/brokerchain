import { jest } from "@jest/globals";
import { slice_prev, slice_next } from "./slice.js";
describe("slice_prev argument: list", () => {
    it("should be []", () => {
        const ret = slice_prev([], 0, 0);
        expect(ret).toEqual([]);
    });
    it("should be []", () => {
        const ret = slice_prev([], 1, 0);
        expect(ret).toEqual([]);
    });
    it("should be []", () => {
        const ret = slice_prev([], 0, 1);
        expect(ret).toEqual([]);
    });
    it("should be []", () => {
        const ret = slice_prev([], 1, 0);
        expect(ret).toEqual([]);
    });
});
describe("slice_prev argument: start", () => {
    it("should be []", () => {
        const ret = slice_prev([0], 0, 0);
        expect(ret).toEqual([]);
    });
    it("should be [0]", () => {
        const ret = slice_prev([0], 0, 1);
        expect(ret).toEqual([0]);
    });
    it("should be [0]", () => {
        const ret = slice_prev([0], 0, 2);
        expect(ret).toEqual([0]);
    });
    it("should be [0]", () => {
        const ret = slice_prev([0, 1], 0, 2);
        expect(ret).toEqual([0]);
    });
    it("should be [0]", () => {
        const ret = slice_prev([0, 1], 0, 3);
        expect(ret).toEqual([0]);
    });
    it("should be []", () => {
        const ret = slice_prev([0, 1], 0, -1);
        expect(ret).toEqual([]);
    });
});
describe("slice_prev argument: count", () => {
    it("should be []", () => {
        const ret = slice_prev([0], 0, 0);
        expect(ret).toEqual([]);
    });
    it("should be [0]", () => {
        const ret = slice_prev([0], 0, 1);
        expect(ret).toEqual([0]);
    });
    it("should be [0]", () => {
        const ret = slice_prev([0], 0, 2);
        expect(ret).toEqual([0]);
    });
    it("should be [0]", () => {
        const ret = slice_prev([0, 1], 0, 2);
        expect(ret).toEqual([0]);
    });
    it("should be [0]", () => {
        const ret = slice_prev([0, 1], 0, 3);
        expect(ret).toEqual([0]);
    });
    it("should be []", () => {
        const ret = slice_prev([0, 1], 0, -1);
        expect(ret).toEqual([]);
    });
    it("should be [1]", () => {
        const ret = slice_prev([0, 1, 2], 1, 1);
        expect(ret).toEqual([1]);
    });
    it("should be [0,1]", () => {
        const ret = slice_prev([0, 1, 2], 1, 2);
        expect(ret).toEqual([0, 1]);
    });
    it("should be [0,1]", () => {
        const ret = slice_prev([0, 1, 2], 1, 3);
        expect(ret).toEqual([0, 1]);
    });
    it("should be []", () => {
        const ret = slice_prev([0, 1, 2], 3, 1);
        expect(ret).toEqual([]);
    });
    it("should be []", () => {
        const ret = slice_prev([0, 1, 2], 3, 2);
        expect(ret).toEqual([]);
    });
});
// next
describe("slice_next argument: list", () => {
    it("should be []", () => {
        const ret = slice_next([], 0, 0);
        expect(ret).toEqual([]);
    });
    it("should be []", () => {
        const ret = slice_next([], 1, 0);
        expect(ret).toEqual([]);
    });
    it("should be []", () => {
        const ret = slice_next([], 0, 1);
        expect(ret).toEqual([]);
    });
    it("should be []", () => {
        const ret = slice_next([], 1, 0);
        expect(ret).toEqual([]);
    });
});
describe("slice_next argument: start", () => {
    it("should be []", () => {
        const ret = slice_next([0], 0, 0);
        expect(ret).toEqual([]);
    });
    it("should be [0]", () => {
        const ret = slice_next([0], 0, 1);
        expect(ret).toEqual([0]);
    });
    it("should be [0]", () => {
        const ret = slice_next([0], 0, 2);
        expect(ret).toEqual([0]);
    });
    it("should be [0,1]", () => {
        const ret = slice_next([0, 1], 0, 2);
        expect(ret).toEqual([0, 1]);
    });
    it("should be [0,1]", () => {
        const ret = slice_next([0, 1], 0, 3);
        expect(ret).toEqual([0, 1]);
    });
    it("should be []", () => {
        const ret = slice_next([0, 1], 0, -1);
        expect(ret).toEqual([]);
    });
});
describe("slice_next argument: count", () => {
    it("should be []", () => {
        const ret = slice_next([0], 0, 0);
        expect(ret).toEqual([]);
    });
    it("should be [0]", () => {
        const ret = slice_next([0], 0, 1);
        expect(ret).toEqual([0]);
    });
    it("should be [0]", () => {
        const ret = slice_next([0], 0, 2);
        expect(ret).toEqual([0]);
    });
    it("should be [0,1]", () => {
        const ret = slice_next([0, 1], 0, 2);
        expect(ret).toEqual([0, 1]);
    });
    it("should be [0,1]", () => {
        const ret = slice_next([0, 1], 0, 3);
        expect(ret).toEqual([0, 1]);
    });
    it("should be []", () => {
        const ret = slice_next([0, 1], 0, -1);
        expect(ret).toEqual([]);
    });
    it("should be [1]", () => {
        const ret = slice_next([0, 1, 2], 1, 1);
        expect(ret).toEqual([1]);
    });
    it("should be [1,2]", () => {
        const ret = slice_next([0, 1, 2], 1, 2);
        expect(ret).toEqual([1, 2]);
    });
    it("should be [1,2]", () => {
        const ret = slice_next([0, 1, 2], 1, 3);
        expect(ret).toEqual([1, 2]);
    });
    it("should be []", () => {
        const ret = slice_next([0, 1, 2], 3, 1);
        expect(ret).toEqual([]);
    });
    it("should be []", () => {
        const ret = slice_next([0, 1, 2], 3, 2);
        expect(ret).toEqual([]);
    });
});
