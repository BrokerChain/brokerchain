import { jest } from "@jest/globals";
import { EventCenter } from "./index.js";
test("empty center", () => {
    const center = new EventCenter();
    expect(() => center.find("x")).not.toThrowError();
});
test("simple case", () => {
    const center = new EventCenter();
    const e1 = center.register("e1");
    expect(e1.id === "e1").toBeTruthy();
    expect(center.find(e1.id)).not.toBeNull();
});
test("invalid action (ignore)", async () => {
    const center = new EventCenter();
    const e1 = center.register("e1");
    const e2 = center.register("e2");
    await e1.cast_to(e2.id, {
        action: "ping",
        data: {}
    });
});
test("invalid action (callback error)", async () => {
    const center = new EventCenter();
    const e1 = center.register("e1");
    const e2 = center.register("e2");
    await e1.cast_to(
        e2.id,
        {
            action: "ping",
            data: {}
        },
        {
            ok: () => {
                throw new Error("unexpected success");
            },
            fail: (err) => {
                // ignore
            }
        }
    );
});
test("invalid action (general handler)", async () => {
    const center = new EventCenter();
    const e1 = center.register("e1");
    const e2 = center.register("e2", {
        // this is a general handler
        _: (data, cb) => {
            expect(data).toStrictEqual("a");
            cb.ok("b");
        }
    });
    await e1.cast_to(
        e2.id,
        {
            action: "ping",
            data: "a"
        },
        {
            ok: (result) => {
                expect(result).toStrictEqual("b");
            },
            fail: (err) => {
                throw err;
            }
        }
    );
});
test("valid action (ok)", async () => {
    const center = new EventCenter();
    const e1 = center.register("e1");
    const e2 = center.register("e2", {
        ping: (data, cb) => {
            expect(data).toStrictEqual("a");
            cb.ok("b");
        }
    });
    await e1.cast_to(
        e2.id,
        {
            action: "ping",
            data: "a"
        },
        {
            ok: (result) => {
                expect(result).toStrictEqual("b");
            },
            fail: (err) => {
                throw err;
            }
        }
    );
});
test("valid action (ok2)", async () => {
    const center = new EventCenter();
    const e1 = center.register("e1");
    const e2 = center.register("e2", {
        ping: (data, cb) => {
            expect(data).toStrictEqual("a");
            cb.ok("b");
        }
    });
    // first message
    await e1.cast_to(
        e2.id,
        {
            action: "ping",
            data: "a"
        },
        {
            ok: (result) => {
                expect(result).toStrictEqual("b");
            },
            fail: (err) => {
                throw err;
            }
        }
    );
    // second message
    await e1.cast_to(
        e2.id,
        {
            action: "ping",
            data: "a"
        },
        {
            ok: (result) => {
                expect(result).toStrictEqual("b");
            },
            fail: (err) => {
                throw err;
            }
        }
    );
});
test("valid action (fail)", async () => {
    const center = new EventCenter();
    const e1 = center.register("e1");
    const e2 = center.register("e2", {
        ping: (data, cb) => {
            expect(data).toStrictEqual("a");
            cb.fail(new Error("fail"));
        }
    });
    await e1.cast_to(
        e2.id,
        {
            action: "ping",
            data: "a"
        },
        {
            ok: (result) => {
                throw new Error("unexpected success");
            },
            fail: (err) => {
                // ignore
            }
        }
    );
});
test("register and unregister (ok-pending)", async () => {
    const center = new EventCenter();
    const e1 = center.register("e1");
    const e2 = center.register("e2", {
        ping: (data, cb) => {
            expect(data).toStrictEqual("a");
            cb.ok("b");
        }
    });
    // cancel it
    center.unregister(e2.id);
    // ok, our message will be pending now
    // it should never be ok or fail, just pending
    e1.cast_to(
        e2.id,
        {
            action: "ping",
            data: "a"
        },
        {
            ok: (result) => {
                throw new Error("unexpected success");
            },
            fail: (err) => {
                throw err;
            }
        }
    );
});
test("register and unregister (ok)", async () => {
    const center = new EventCenter();
    const e1 = center.register("e1");
    const e2 = center.register("e2", {
        ping: (data, cb) => {
            throw new Error("unexpected invoke");
        }
    });
    center.unregister(e2.id);
    center.register("e2", {
        ping: (data, cb) => {
            expect(data).toStrictEqual("a");
            cb.ok("b");
        }
    });
    await e1.cast_to(
        e2.id,
        {
            action: "ping",
            data: "a"
        },
        {
            ok: (result) => {
                expect(result).toStrictEqual("b");
            },
            fail: (err) => {
                throw err;
            }
        }
    );
});
test("simple subscribe/unsubscribe", () => {
    const center = new EventCenter();
    expect(center.subscriber.length).toStrictEqual(0);
    const obj = center.subscribe_all({
        filter: () => false,
        begin_callback: () => {
            // ignore
            throw new Error("unexpected callback");
        },
        end_callback: () => {
            // ignore
            throw new Error("unexpected callback");
        }
    });
    expect(center.subscriber.length).toStrictEqual(1);
    obj.unsubscribe();
    expect(center.subscriber.length).toStrictEqual(0);
});
test("simple subscribe receive", (done) => {
    const center = new EventCenter();
    const e1 = center.register("e1", {
        ping: (data, cb) => cb.ok("pong")
    });
    const e2 = center.register("e2", {
        // nothing
    });
    expect(center.subscriber.length).toStrictEqual(0);
    let begin_callback_invoked = false;
    center.subscribe_all({
        filter: (e) => true,
        begin_callback: () => {
            begin_callback_invoked = true;
        },
        end_callback: (e) => {
            if (!begin_callback_invoked) {
                throw new Error("begin callback not invoked but end callback is invoked?");
            }
            done();
        }
    });
    e2.cast_to(e1.id, {
        action: "ping",
        data: null
    });
});
