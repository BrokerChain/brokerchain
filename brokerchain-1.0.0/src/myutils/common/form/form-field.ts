import { Why } from "./index.js";
import { Logger } from "../../logger.js";
import { EventSource } from "../index.js";
export type Validator<T> = (v: T | undefined, refuse: Why) => boolean;
export class FormField<T> {
    _id: string;
    _value: T | undefined;
    _validator: Validator<T>;
    // for browser
    _readonly: boolean = false;
    _error_visible: boolean = false;
    _on_changed = new EventSource<FormField<T>>();
    constructor(plog: Logger, id: string) {
        this._id = id;
        this._value = undefined;
        this._validator = () => true;
        const log = this._sub_log(plog, "new");
        log.ok();
    }
    private _sub_log(plog: Logger, name: string) {
        return plog.sub("form-field").sub(this._id).sub(name);
    }
    value(plog: Logger, v: T, notify = true) {
        const log = this._sub_log(plog, "value");
        log.variable("old_value", this._value);
        log.variable("new_value", v);
        this._value = v;
        if (notify) {
            this._on_changed._notify(this);
        }
        return this;
    }
    validator(plog: Logger, v: Validator<T>, notify = true) {
        // nothing to log
        // const log = this._sub_log(plog, "validator");
        this._validator = v;
        if (notify) {
            this._on_changed._notify(this);
        }
        return this;
    }
    readonly(plog: Logger, v: boolean, notify = true) {
        const log = this._sub_log(plog, "readonly");
        log.println(`change value ${this._readonly} -> ${v}`);
        this._readonly = v;
        if (notify) {
            this._on_changed._notify(this);
        }
        return this;
    }
    error_visible(plog: Logger, v: boolean, notify = true) {
        const log = this._sub_log(plog, "error_visible");
        log.println(`change value ${this._error_visible} -> ${v}`);
        this._error_visible = v;
        if (notify) {
            this._on_changed._notify(this);
        }
        return this;
    }
    check<R>(
        plog: Logger,
        cb: {
            ok: () => R;
            fail: (why: Why) => R;
        }
    ) {
        const log = this._sub_log(plog, "check");
        const why = new Why();
        const ok = this._validator(this._value, why);
        // only display failure message
        if (!ok) {
            log.variable("ok", ok);
            log.variable("why", [why._reason, why._explain]);
        }
        // detect error
        if (ok && why._reason !== "none") {
            throw log.new_error("should not return ok and provide failure reason");
        } else if (!ok && why._reason === "none") {
            throw log.new_error("should not return not ok and provide nothing for failure reason");
        }
        return ok ? cb.ok() : cb.fail(why);
    }
    is_empty(plog: Logger) {
        const log = this._sub_log(plog, "is_empty");
        const v = this._value === undefined;
        log.variable("result", v);
        return v;
    }
    error(plog: Logger) {
        const log = this._sub_log(plog, "error");
        const v = this.check(log, {
            ok: () => {
                return "";
            },
            fail: (why) => {
                return why.display();
            }
        });
        log.variable("result", v);
        return v;
    }
}
