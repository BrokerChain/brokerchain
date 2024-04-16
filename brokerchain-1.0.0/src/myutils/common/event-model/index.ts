export class EventCenter {
    map = new Map<string, EventHost>();
    subscriber: EventSubscriber[] = [];
    register(
        id: string,
        actions: {
            [key: string]: EventHostActionHandler<any, any>;
        } = {}
    ): EventHostServerRef {
        const host = this._get_or_create(id);
        Object.keys(actions).forEach((name) => {
            const value = actions[name];
            host.handle(name, value);
        });
        setTimeout(() => {
            host.resume();
        }, 0);
        return new EventHostServerRef(id, this);
    }
    unregister(id: string) {
        const host = this.map.get(id);
        if (!host) return;
        // we can drop the current working one (ignore whatever state it is)
        // but the message queue (pending items to be processed) must not be dropped
        const new_host = new EventHost(id, this);
        new_host.queue = host.queue.slice(); // shadow clone
        new_host.pause();
        this.map.set(id, new_host);
        // ok, since now
        // every EventHostServerRef/EventHostClientRef will reference to our new object
        // cool!
    }
    find(id: string): EventHostClientRef {
        return new EventHostClientRef(id, this);
    }
    subscribe_all(opts: EventSubscriberOpts) {
        const obj = new EventSubscriber(opts);
        this.subscriber.push(obj);
        return {
            unsubscribe: () => {
                this.subscriber = this.subscriber.filter((item) => item !== obj);
            }
        };
    }
    // note: action callback is invoked only at event end
    subscribe(
        id: string,
        actions: {
            [key: string]: (e: Event<any, any>) => void;
        }
    ) {
        return this.subscribe_all({
            filter: (e) => e.to === id && typeof actions[e.action] === "function",
            begin_callback: () => {
                // ignore
            },
            end_callback: (e) => {
                const fun = actions[e.action];
                fun(e);
            }
        });
    }
    _get_or_create(id: string) {
        let host = this.map.get(id);
        if (!host) {
            // important this object's ready is false
            // block any message processing now, because it will fail
            // until real one registered
            host = new EventHost(id, this).pause();
            this.map.set(id, host);
        }
        return host;
    }
    _notify_begin(e: Event<any, any>) {
        // debug
        console.log("_notify_begin", e);
        this.subscriber.forEach((item) => {
            item.event_begin(e);
        });
    }
    _notify_end(e: Event<any, any>) {
        // debug
        console.log("_notify_end", e);
        this.subscriber.forEach((item) => {
            item.event_end(e);
        });
    }
}
type EventFilter = (e: Event<any, any>) => boolean;
type EventCallback = (e: Event<any, any>) => void;
interface EventSubscriberOpts {
    filter: EventFilter;
    begin_callback: EventCallback;
    end_callback: EventCallback;
}
class EventSubscriber {
    filter: EventFilter;
    begin_callback: EventCallback;
    end_callback: EventCallback;
    constructor(opts: EventSubscriberOpts) {
        this.filter = opts.filter;
        this.begin_callback = opts.begin_callback;
        this.end_callback = opts.end_callback;
    }
    event_begin(e: Event<any, any>) {
        if (this.filter(e)) {
            this.begin_callback(e);
        }
    }
    event_end(e: Event<any, any>) {
        if (this.filter(e)) {
            this.end_callback(e);
        }
    }
}
// this class provides the same operations as EventHost
// it is a proxy between the user and the real EventHost object
// only user side apis are provided
export class EventHostClientRef {
    id: string;
    protected center: EventCenter;
    constructor(id: string, center: EventCenter) {
        this.id = id;
        this.center = center;
    }
    protected get_host() {
        return this.center._get_or_create(this.id);
    }
    async cast(
        info: {
            from: string;
            action: string;
            data: any;
        },
        cb: Callback<any> = {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                // ignore
            }
        }
    ): Promise<void> {
        const host = this.get_host();
        return host.cast(info, cb);
    }
    async cast_to(
        id: string,
        info: {
            action: string;
            data: any;
        },
        cb: Callback<any> = {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                // ignore
            }
        }
    ): Promise<void> {
        const host = this.get_host();
        return host.cast_to(id, info, cb);
    }
}
// this class provides the same operations as EventHost
// it is a proxy between the user and the real EventHost object
// both user & server side apis are provided
export class EventHostServerRef extends EventHostClientRef {
    constructor(id: string, center: EventCenter) {
        super(id, center);
    }
    handle<T1 = any, T2 = any>(name: string, handler: EventHostActionHandler<T1, T2>) {
        const host = this.get_host();
        host.handle(name, handler);
        return this; // ! keep return this proxy, not the real host object
    }
}
export class EventHost {
    id: string;
    center: EventCenter;
    current: Event<any, any> | null = null;
    queue: Event<any, any>[] = [];
    handler = new Map<string, EventHostActionHandler<any, any>>();
    block: boolean = false;
    constructor(id: string, center: EventCenter) {
        this.id = id;
        this.center = center;
    }
    pause() {
        if (this.block) return this;
        this.block = true;
        return this;
    }
    resume() {
        if (!this.block) return this;
        this.block = false;
        this.process_next();
        return this;
    }
    // note '_' is a special handle name which accept any
    // event that no any other handler accept
    handle<T1 = any, T2 = any>(name: string, handler: EventHostActionHandler<T1, T2>) {
        this.handler.set(name, handler);
        return this;
    }
    async cast(
        info: {
            from: string;
            action: string;
            data: any;
        },
        cb: Callback<any> = {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                // ignore
            }
        }
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.queue.push({
                from: info.from,
                to: this.id,
                timestamp: Date.now(),
                action: info.action,
                data: info.data,
                ok_cb: (result) => {
                    cb.ok(result);
                    resolve();
                },
                fail_cb: (err) => {
                    console.error(err);
                    cb.fail(err);
                    // never throw error
                    resolve();
                },
                ok_result: undefined,
                fail_result: undefined,
                status: "pending"
            });
            this.process_next();
        });
    }
    async cast_to(
        id: string,
        info: {
            action: string;
            data: any;
        },
        cb: Callback<any> = {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                // ignore
            }
        }
    ): Promise<void> {
        const target = this.center.find(id);
        await target.cast({ from: this.id, action: info.action, data: info.data }, cb);
    }
    private process_next() {
        if (this.block) return;
        if (this.queue.length === 0) return;
        if (this.current) return;
        const current = this.queue.shift();
        // this should never happend, but i have to write it here
        // to prevent the tsc warning
        if (!current) {
            throw new Error("unexpected state");
        }
        this.current = current;
        this.center._notify_begin(current);
        const ok = (result: any) => {
            current.status = "ok";
            current.ok_result = result;
            // clear running state and process next one
            this.current = null;
            this.center._notify_end(current);
            current.ok_cb(result); // notify end before callback for nest scenes
            this.process_next();
        };
        const fail = (err: Error) => {
            current.status = "fail";
            current.fail_result = err;
            // clear running state and process next one
            this.current = null;
            this.center._notify_end(current);
            current.fail_cb(err); // notify end before callback for nest scenes
            this.process_next();
        };
        let handler = this.handler.get(current.action);
        if (!handler) {
            // well, try find general handler "_"
            const general_handler = this.handler.get("_");
            if (!general_handler) {
                fail(new Error("unknown action: " + current.action));
                return;
            } else {
                // ok, let general handler process
                handler = general_handler;
            }
        }
        current.status = "running";
        handler(current.data, {
            ok: (result) => {
                ok(result);
            },
            fail: (err) => {
                fail(err);
            }
        });
    }
}
export type EventHostActionHandler<T1, T2> = (data: T1, cb: Callback<T2>) => void;
export class Event<T1, T2> {
    // metadata
    from: string = "";
    to: string = "";
    timestamp: number = Date.now();
    // info
    action: string = "";
    data?: T1;
    // callback
    ok_cb: (result: T2) => void = () => {};
    fail_cb: (err: Error) => void = () => {};
    ok_result?: T2;
    fail_result?: Error;
    status: EventStatus = "pending";
}
export type EventStatus = "pending" | "running" | "ok" | "fail";
interface Callback<T> {
    ok: (result: T) => void;
    fail: (err: Error) => void;
}
