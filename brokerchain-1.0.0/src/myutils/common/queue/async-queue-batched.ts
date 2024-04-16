import { Logger } from "../../logger.js";
interface Callback {
    ok: () => void;
    fail: (err: Error) => void;
}
interface Request {
    plog: Logger;
    id: string;
    cb: Callback;
}
type Action<T> = (plog: Logger, items: T[], cb: Callback) => void;
export class AsyncQueueBatched<T extends Request> {
    private log: Logger;
    private working: T[];
    private waiting: T[];
    private action: Action<T>;
    constructor(log: Logger, action: Action<T>) {
        this.log = log;
        this.action = action;
        this.working = [];
        this.waiting = [];
    }
    push(item: T) {
        this.waiting.push(item);
        this.fireAction();
    }
    private fireAction() {
        if (!this.action) return;
        if (this.working.length) return;
        if (!this.waiting.length) return;
        this.working = this.waiting;
        this.waiting = [];
        this.action(this.log, this.working, {
            ok: () => {
                this.working.forEach((req) => {
                    req.cb.ok();
                });
                this.working = [];
                this.fireAction();
            },
            fail: (err) => {
                this.working.forEach((req) => {
                    req.cb.fail(err);
                });
                this.working = [];
                this.fireAction();
            }
        });
    }
}
