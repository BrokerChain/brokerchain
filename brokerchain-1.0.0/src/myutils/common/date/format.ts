import { pad_leading_zero as pz } from "../text.js";
interface DateInfo {
    // 1900
    year: string;
    // 01
    month: string;
    // 02
    date: string;
    // 06
    hours: string;
    // 23
    minutes: string;
    // 01
    seconds: string;
}
export function format<R>(
    date: Date | string,
    cb: {
        ok: (info: DateInfo) => R;
        fail: (err: Error) => R;
    }
): R {
    let date_obj: Date = null;
    if (typeof date === "string") {
        date_obj = new Date(date);
    }
    if (isNaN(date_obj.valueOf())) {
        return cb.fail(new Error("invalid date"));
    } else {
        const Y = date_obj.getFullYear();
        const M = date_obj.getMonth() + 1;
        const D = date_obj.getDate();
        const h = date_obj.getHours();
        const m = date_obj.getMinutes();
        const s = date_obj.getSeconds();
        return cb.ok({
            year: pz(Y.toString(), 4),
            month: pz(M.toString(), 2),
            date: pz(D.toString(), 2),
            hours: pz(h.toString(), 2),
            minutes: pz(m.toString(), 2),
            seconds: pz(s.toString(), 2)
        });
    }
}
