import { Logger } from "../logger.js";
// examples:
//
// list = ['a', 'b', 'c', 'd', 'e']
//
// slice_next(list, 2, 0) => []
//
// slice_next(list, 2, 1) => ['c']
//
// slice_next(list, 2, 2) => ['c', 'd']
//
// slice_next(list, 2, 3) => ['c', 'd', 'e']
//
// slice_next(list, 2, 4) => ['c', 'd', 'e']
export function slice_next<T>(list: T[], start: number, count: number): T[] {
    if (!list.length) return [];
    if (count <= 0) return [];
    if (start < 0 || start > list.length - 1) return [];
    const end = start + count;
    return list.slice(start, end);
}
// examples:
//
// list = ['a', 'b', 'c', 'd', 'e', 'f']
//
// slice_prev(list, 2, 0) => []
//
// slice_prev(list, 2, 1) => ['c']
//
// slice_prev(list, 2, 2) => ['b', 'c']
//
// slice_prev(list, 2, 3) => ['a', 'b', 'c']
//
// slice_prev(list, 2, 4) => ['a', 'b', 'c']
export function slice_prev<T>(list: T[], start: number, count: number): T[] {
    if (!list.length) return [];
    if (count <= 0) return [];
    if (start < 0 || start > list.length - 1) return [];
    const rev_list = list.slice().reverse();
    const rev_start = list.length - 1 - start;
    const rev_end = rev_start + count;
    return rev_list.slice(rev_start, rev_end).reverse();
}
export function slice_prev_cb<T, R>(
    plog: Logger,
    opts: {
        list: T[];
        start: number;
        count: number;
    },
    cb: {
        empty: () => R;
        ok: (list: T[]) => R;
    }
): R {
    const log = plog.sub("slice_prev_cb");
    const { list, start, count } = opts;
    const v = slice_prev(list, start, count);
    if (v.length === 0) {
        return cb.empty();
    } else {
        return cb.ok(v);
    }
}
export function slice_next_cb<T, R>(
    plog: Logger,
    opts: {
        list: T[];
        start: number;
        count: number;
    },
    cb: {
        empty: () => R;
        ok: (list: T[]) => R;
    }
): R {
    const log = plog.sub("slice_next_cb");
    const { list, start, count } = opts;
    const v = slice_next(list, start, count);
    if (v.length === 0) {
        return cb.empty();
    } else {
        return cb.ok(v);
    }
}
