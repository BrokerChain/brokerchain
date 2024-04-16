import { Logger } from "../../logger.js";
import { Form, FormField, FailedField, Why, Validator } from "./index.js";
// WARN: browser must support proxy
export class TypedForm<T> {
    _form: Form;
    field: {
        [P in keyof T]: FormField<T[P]>;
    };
    constructor(plog: Logger, id: string, data: T) {
        const log = plog.sub("typed-form").sub("new");
        this._form = new Form(plog, id);
        const base = {};
        this.field = new Proxy(base, {
            get: (target, prop_name, receiver) => {
                const log = plog.sub("get-field");
                log.variable("prop_name", prop_name);
                const prop_name_str = String(prop_name);
                return this._form.get_field(log, prop_name_str, {
                    ok: (field) => {
                        return field;
                    },
                    not_found: () => {
                        debugger;
                        throw log.new_error("uninitialized field: " + prop_name_str);
                    }
                });
            }
        }) as any;
        this.write_data(log, data);
        log.println("done");
    }
    get id() {
        return this._form.id;
    }
    map_fields<R>(plog: Logger, map: MapFields<T, R>): MappedFields<T, R> {
        const log = plog.sub("typed-form").sub("map_fields");
        const ret: any = {};
        Object.keys(map).forEach((key) => {
            const v = this._form.get_field(log, key, {
                ok: (field) => {
                    const f = (map as any)[key];
                    ret[key] = f(field);
                },
                not_found: () => {
                    throw log.new_error("stupid programmer");
                }
            });
        });
        return ret;
    }
    validators(
        plog: Logger,
        def: {
            [P in keyof T]: Validator<T[P]>;
        }
    ) {
        const log = plog.sub("typed-form").sub("validators");
        Object.keys(def).forEach((key) => {
            this._form.get_field(plog, key, {
                ok: (field) => {
                    const v = (def as any)[key];
                    field.validator(log, v);
                },
                not_found: () => {
                    throw log.new_error("stupid programmer");
                }
            });
        });
        return this;
    }
    write_data(plog: Logger, data: T) {
        Object.keys(data).forEach((key) => {
            if (!this._form.has_field(plog, key)) {
                this._form._field(plog, key);
            }
        });
        this._form.write_data(plog, data);
        return this;
    }
    read_data(plog: Logger): T {
        const data = this._form.read_data(plog);
        return data as T;
    }
    check_all<R>(
        plog: Logger,
        cb: {
            ok: () => R;
            fail: (ok_list: FormField<any>[], failed_list: FailedField<any>[]) => R;
        }
    ) {
        return this._form.check_all(plog, cb);
    }
    readonly(plog: Logger, v: boolean) {
        this._form.readonly(plog, v);
        return this;
    }
    error_visible(plog: Logger, v: boolean) {
        this._form.error_visible(plog, v);
        return this;
    }
    can_submit(plog: Logger) {
        return this._form.can_submit(plog);
    }
}
type MapFields<T, R> = {
    [P in keyof T]: (field: FormField<T[P]>) => R;
};
type MappedFields<T, R> = {
    [P in keyof T]: R;
};
