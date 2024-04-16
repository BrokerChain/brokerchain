import { Logger } from "../../../../../myutils/logger.js";
import { IdItem } from "../../simple-coll/type/index.js";
import { make_anchor, make_empty_anchor, parse_anchor, is_empty_anchor, Anchor } from "../../../../../myutils/common/anchor.js";
import { slice_prev_cb, slice_next_cb } from "../../../../../myutils/common/slice.js";
import { find } from "../../../../../myutils/common/find.js";
type QueryDirection = "prev" | "next";
interface Query {
    [key: string]: string;
}
interface QueryPageOpts {
    max?: number;
    anchor?: string;
    direction?: QueryDirection;
    query?: Query;
}
interface QueryPageResult<T extends IdItem> {
    list: T[];
    total: number;
    anchor: string;
}
// use this helper class to handle paged query
export class ListEngine<T extends IdItem> {
    _list: T[];
    default_max = 30;
    max_max = 50;
    constructor(list: T[]) {
        this._list = list;
    }
    query_page<R>(plog: Logger, input: QueryPageOpts, cb: ExecuteCallback<T, R>): R {
        const log = plog.sub("list-engine.query_page");
        const { max_max, default_max } = this;
        log.variable("input", input);
        log.variable("max_max", max_max);
        log.variable("default_max", default_max);
        const _max = input.max === undefined ? default_max : input.max;
        if (!Number.isSafeInteger(_max)) {
            return cb.fail(log.new_error("input.max is not a safe integer"));
        }
        const list = this._list;
        const anchor = input.anchor || "";
        const max = Math.min(max_max, _max);
        const direction: QueryDirection = input.direction ? input.direction : "next";
        const query = input.query;
        log.variable("anchor", anchor);
        log.variable("max", max);
        log.variable("direction", direction);
        log.variable("query", query);
        return parse_anchor(log, anchor, {
            none: () => {
                const empty_anchor: Anchor = {
                    head_id: "",
                    tail_id: ""
                };
                return new Executor(list, max, empty_anchor, direction, query).execute(log, cb);
            },
            ok: (anchor) => {
                return new Executor(list, max, anchor, direction, query).execute(log, cb);
            },
            fail: (err) => {
                return cb.fail(err);
            }
        });
    }
}
interface ExecuteCallback<T extends IdItem, R> {
    ok: (result: QueryPageResult<T>) => R;
    fail: (err: Error) => R;
}
class Executor<T extends IdItem> {
    _list: T[];
    _max: number;
    _anchor: Anchor;
    _direction: QueryDirection;
    _query: Query;
    constructor(list: T[], max: number, anchor: Anchor, direction: QueryDirection, query: Query) {
        this._list = list;
        this._max = max;
        this._anchor = anchor;
        this._direction = direction;
        this._query = query;
    }
    execute<R>(plog: Logger, cb: ExecuteCallback<T, R>): R {
        const log = plog.sub("executor.execute");
        log.variable("direction", this._direction);
        switch (this._direction) {
            case "prev":
                return this.prev(log, cb);
            case "next":
                return this.next(log, cb);
            default:
                throw new Error("stupid programmer");
        }
    }
    private prev<R>(plog: Logger, cb: ExecuteCallback<T, R>): R {
        const log = plog.sub("prev");
        const { _anchor: anchor, _list: list, _max: max } = this;
        return is_empty_anchor(log, anchor, {
            empty: () => {
                return slice_prev_cb(
                    log,
                    { list, start: list.length - 1, count: max },
                    {
                        empty: () => {
                            return cb.ok({
                                list: [],
                                total: list.length,
                                anchor: make_empty_anchor(log)
                            });
                        },
                        ok: (prev_list) => {
                            return cb.ok({
                                list: prev_list,
                                total: list.length,
                                anchor: make_anchor(log, {
                                    head_id: prev_list[0].id,
                                    tail_id: prev_list[prev_list.length - 1].id
                                })
                            });
                        }
                    }
                );
            },
            not_empty: () => {
                return find(
                    {
                        list,
                        match: (item) => item.id === anchor.head_id
                    },
                    {
                        ok: ({ prev }) => {
                            if (!prev) {
                                return cb.ok({
                                    list: [],
                                    total: list.length,
                                    anchor: make_anchor(log, anchor)
                                });
                            } else {
                                return slice_prev_cb(
                                    log,
                                    {
                                        list,
                                        start: prev.index,
                                        count: max
                                    },
                                    {
                                        empty: () => {
                                            return cb.ok({
                                                list: [],
                                                total: list.length,
                                                anchor: make_empty_anchor(log)
                                            });
                                        },
                                        ok: (prev_list) => {
                                            return cb.ok({
                                                list: prev_list,
                                                total: list.length,
                                                anchor: make_anchor(log, {
                                                    head_id: prev_list[0].id,
                                                    tail_id: prev_list[prev_list.length - 1].id
                                                })
                                            });
                                        }
                                    }
                                );
                            }
                        },
                        not_found: () => {
                            return cb.fail(log.new_error("anchor.tail_id not found"));
                        }
                    }
                );
            }
        });
    }
    private next<R>(plog: Logger, cb: ExecuteCallback<T, R>): R {
        const log = plog.sub("next");
        const { _anchor: anchor, _list: list, _max: max } = this;
        return is_empty_anchor(log, anchor, {
            empty: () => {
                return slice_next_cb(
                    log,
                    {
                        list,
                        start: 0,
                        count: max
                    },
                    {
                        empty: () => {
                            return cb.ok({
                                list: [],
                                total: list.length,
                                anchor: make_empty_anchor(log)
                            });
                        },
                        ok: (next_list) => {
                            return cb.ok({
                                list: next_list,
                                total: list.length,
                                anchor: make_anchor(log, {
                                    head_id: next_list[0].id,
                                    tail_id: next_list[next_list.length - 1].id
                                })
                            });
                        }
                    }
                );
            },
            not_empty: () => {
                return find(
                    {
                        list,
                        match: (item) => item.id === anchor.tail_id
                    },
                    {
                        ok: ({ next }) => {
                            if (!next) {
                                return cb.ok({
                                    list: [],
                                    total: list.length,
                                    anchor: make_anchor(log, anchor)
                                });
                            } else {
                                return slice_next_cb(
                                    log,
                                    { list, start: next.index, count: max },
                                    {
                                        empty: () => {
                                            return cb.ok({
                                                list: [],
                                                total: list.length,
                                                anchor: make_empty_anchor(log)
                                            });
                                        },
                                        ok: (next_list) => {
                                            return cb.ok({
                                                list: next_list,
                                                total: list.length,
                                                anchor: make_anchor(log, {
                                                    head_id: next_list[0].id,
                                                    tail_id: next_list[next_list.length - 1].id
                                                })
                                            });
                                        }
                                    }
                                );
                            }
                        },
                        not_found: () => {
                            return cb.fail(log.new_error("anchor.tail_id not found"));
                        }
                    }
                );
            }
        });
    }
}
