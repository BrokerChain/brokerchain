import { Logger } from "../../logger.js";
import { Element } from "./_/index.js";
export class Raw2 extends Element {
    _content: string = "";
    constructor() {
        super("raw");
    }
    content(v: string) {
        // FIXME encoding
        this._content = v;
        return this;
    }
    to_text<R>(
        plog: Logger,
        cb: {
            ok: (v: string) => R;
            fail: (err: Error) => R;
        }
    ): R {
        const log = plog.sub("to_html");
        log.variable("name", this._name);
        log.variable("id", this._id);
        return cb.ok(this._content);
    }
}
export function raw2(v: string) {
    return new Raw2().content(v);
}
