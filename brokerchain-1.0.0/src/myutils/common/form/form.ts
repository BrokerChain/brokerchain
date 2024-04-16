import { Logger } from "../../logger.js";
import { FormField, Why } from "./index.js";
type FormData = {
    // id -> value
    [key: string]: any;
};
export class Form {
    id: string;
    field_list: FormField<any>[];
    constructor(plog: Logger, id: string) {
        this.id = id;
        this.field_list = [];
        const log = this._sub_log(plog, "new");
        log.ok();
    }
    private _sub_log(plog: Logger, name: string) {
        // debug disable log
        return plog.sub("form").sub(this.id).sub(name).enable(false);
    }
    _field(plog: Logger, id: string) {
        const log = this._sub_log(plog, "field");
        log.variable("id", id);
        const field = new FormField(log, id);
        // remove existing
        this.field_list = this.field_list.filter((item) => {
            if (item._id === id) {
                log.warn("duplicated field with same id, will override");
                debugger;
                return false;
            } else {
                return true;
            }
        });
        this.field_list.push(field);
        return field;
    }
    add_field<R>(plog: Logger, id: string, cb: (field: FormField<any>) => R): R {
        const v = this._field(plog, id);
        return cb(v);
    }
    has_field(plog: Logger, id: string) {
        const log = this._sub_log(plog, "has_field");
        const v = this.get_field(log, id, {
            ok: () => true,
            not_found: () => false
        });
        log.variable("result", v);
        return v;
    }
    get_field<R>(
        plog: Logger,
        id: string,
        cb: {
            ok: (field: FormField<any>) => R;
            not_found: () => R;
        }
    ): R {
        const log = this._sub_log(plog, "get_field");
        log.variable("id", id);
        const target = this.field_list.find((item) => item._id === id);
        log.println(target ? "ok, found" : "not found");
        return target ? cb.ok(target) : cb.not_found();
    }
    readonly(plog: Logger, v: boolean) {
        const log = this._sub_log(plog, "readonly");
        this.field_list.forEach((item) => item.readonly(log, v));
        return this;
    }
    error_visible(plog: Logger, v: boolean) {
        const log = this._sub_log(plog, "error_visible");
        this.field_list.forEach((item) => item.error_visible(log, v));
        return this;
    }
    write_data(plog: Logger, data: FormData) {
        const log = this._sub_log(plog, "write_data");
        log.variable("data", data);
        this.field_list.forEach((field) => {
            field.value(log, data[field._id]);
        });
        log.println("done");
    }
    read_data(plog: Logger): FormData {
        const log = this._sub_log(plog, "read_data");
        const data: FormData = {};
        this.field_list.forEach((field) => {
            data[field._id] = field._value;
        });
        log.variable("data", data);
        return data;
    }
    check_all<R>(
        plog: Logger,
        cb: {
            ok: () => R;
            fail: (ok_list: FormField<any>[], failed_list: FailedField<any>[]) => R;
        }
    ) {
        const log = this._sub_log(plog, "check_all");
        const ok_list: FormField<any>[] = [];
        const failed_list: FailedField<any>[] = [];
        this.field_list.forEach((item) => {
            item.check(log, {
                ok: () => {
                    ok_list.push(item);
                },
                fail: (why) => {
                    failed_list.push({
                        field: item,
                        why
                    });
                }
            });
        });
        log.println(`${failed_list.length} items failed`);
        return failed_list.length === 0 ? cb.ok() : cb.fail(ok_list, failed_list);
    }
    can_submit(plog: Logger) {
        const log = this._sub_log(plog, "can_submit");
        const v = this.check_all(log, {
            ok: () => {
                return true;
            },
            fail: () => {
                return false;
            }
        });
        log.variable("result", v);
        return v;
    }
}
export interface FailedField<T> {
    field: FormField<T>;
    why: Why;
}
