import { jest } from "@jest/globals";
import { Logger } from "../../../../../myutils/logger.js";
import { make_anchor } from "../../../../../myutils//common/anchor.js";
import { ListEngine } from "./list-engine.js";
const log = new Logger("test");
const direction_list = ["prev", "next"] as ("prev" | "next")[];
const empty_anchor_list = ["", `["",""]`];
describe("list-engine: query on empty list", () => {
    it("should be ok", () => {
        const e = new ListEngine([]);
        e.query_page(
            log,
            {},
            {
                ok: (result) => {
                    expect(result.list.length).toStrictEqual(0);
                    expect(result.total).toStrictEqual(0);
                    expect(result.anchor).toStrictEqual("");
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    });
    // generate some test cases
    // they should always return the same result
    for (let direction of direction_list) {
        for (let anchor of empty_anchor_list) {
            for (let max = 0; max < 10; ++max) {
                it("should be ok", () => {
                    const e = new ListEngine([]);
                    e.query_page(
                        log,
                        {
                            direction,
                            max,
                            anchor
                        },
                        {
                            ok: (result) => {
                                expect(result.list.length).toStrictEqual(0);
                                expect(result.total).toStrictEqual(0);
                                expect(result.anchor).toStrictEqual("");
                            },
                            fail: (err) => {
                                throw err;
                            }
                        }
                    );
                });
            }
        }
    }
});
describe("list-engine: query on single element list", () => {
    const target = { id: "a" };
    it("should be ok", () => {
        new ListEngine([target]).query_page(
            log,
            {},
            {
                ok: (result) => {
                    expect(result.list.length).toStrictEqual(1);
                    expect(result.list[0]).toStrictEqual(target);
                    expect(result.total).toStrictEqual(1);
                    expect(result.anchor).toStrictEqual(
                        make_anchor(log, {
                            head_id: target.id,
                            tail_id: target.id
                        })
                    );
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    });
    // generate some test cases
    // they should always return the same result
    for (let direction of direction_list) {
        for (let anchor of empty_anchor_list) {
            // zero max means zero items to return
            it("should be ok", () => {
                new ListEngine([target]).query_page(
                    log,
                    {
                        direction,
                        max: 0,
                        anchor
                    },
                    {
                        ok: (result) => {
                            expect(result.list.length).toStrictEqual(0);
                            expect(result.total).toStrictEqual(1);
                            expect(result.anchor).toStrictEqual("");
                        },
                        fail: (err) => {
                            throw err;
                        }
                    }
                );
            });
            for (let max = 1; max < 10; ++max) {
                it("should be ok", () => {
                    new ListEngine([target]).query_page(
                        log,
                        {
                            direction,
                            max,
                            anchor
                        },
                        {
                            ok: (result) => {
                                expect(result.list.length).toStrictEqual(1);
                                expect(result.list[0]).toStrictEqual(target);
                                expect(result.total).toStrictEqual(1);
                                expect(result.anchor).toStrictEqual(
                                    make_anchor(log, {
                                        head_id: target.id,
                                        tail_id: target.id
                                    })
                                );
                            },
                            fail: (err) => {
                                throw err;
                            }
                        }
                    );
                });
            }
        }
    }
});
describe("list-engine: query on two elements list", () => {
    const target1 = { id: "a" };
    const target2 = { id: "b" };
    it("should be ok", () => {
        new ListEngine([target1, target2]).query_page(
            log,
            {},
            {
                ok: (result) => {
                    expect(result.list.length).toStrictEqual(2);
                    expect(result.list[0]).toStrictEqual(target1);
                    expect(result.list[1]).toStrictEqual(target2);
                    expect(result.total).toStrictEqual(2);
                    expect(result.anchor).toStrictEqual(
                        make_anchor(log, {
                            head_id: target1.id,
                            tail_id: target2.id
                        })
                    );
                },
                fail: (err) => {
                    throw err;
                }
            }
        );
    });
    // generate some test cases
    // they should always return the same result
    for (let direction of direction_list) {
        for (let anchor of empty_anchor_list) {
            it("should be ok", () => {
                new ListEngine([target1, target2]).query_page(
                    log,
                    {
                        direction,
                        max: 0,
                        anchor
                    },
                    {
                        ok: (result) => {
                            expect(result.total).toStrictEqual(2);
                            expect(result.list.length).toStrictEqual(0);
                            expect(result.anchor).toStrictEqual("");
                        },
                        fail: (err) => {
                            throw err;
                        }
                    }
                );
            });
            it("should be ok", () => {
                new ListEngine([target1, target2]).query_page(
                    log,
                    {
                        direction,
                        max: 1,
                        anchor
                    },
                    {
                        ok: (result) => {
                            expect(result.total).toStrictEqual(2);
                            expect(result.list.length).toStrictEqual(1);
                            if (direction === "next") {
                                expect(result.list[0]).toStrictEqual(target1);
                                expect(result.anchor).toStrictEqual(
                                    make_anchor(log, {
                                        head_id: target1.id,
                                        tail_id: target1.id
                                    })
                                );
                            } else {
                                expect(result.list[0]).toStrictEqual(target2);
                                expect(result.anchor).toStrictEqual(
                                    make_anchor(log, {
                                        head_id: target2.id,
                                        tail_id: target2.id
                                    })
                                );
                            }
                        },
                        fail: (err) => {
                            throw err;
                        }
                    }
                );
            });
            for (let max = 2; max < 10; ++max) {
                it("should be ok", () => {
                    new ListEngine([target1, target2]).query_page(
                        log,
                        {
                            direction,
                            max,
                            anchor
                        },
                        {
                            ok: (result) => {
                                expect(result.total).toStrictEqual(2);
                                expect(result.list.length).toStrictEqual(2);
                                expect(result.list[0]).toStrictEqual(target1);
                                expect(result.list[1]).toStrictEqual(target2);
                                expect(result.anchor).toStrictEqual(
                                    make_anchor(log, {
                                        head_id: target1.id,
                                        tail_id: target2.id
                                    })
                                );
                            },
                            fail: (err) => {
                                throw err;
                            }
                        }
                    );
                });
            }
        }
    }
});
function random_direction() {
    return Math.random() < 0.5 ? "prev" : "next";
}
function random_max(max: number = 100) {
    return Math.floor(Math.random() * max);
}
function random_empty_anchor() {
    return Math.random() < 0.5 ? "" : JSON.stringify(["", ""]);
}
