interface IdCardInfo {
    year: number;
    month: number;
    date: number;
    // extral info
    age: number;
}
export function id_card_no<R>(
    v: string,
    cb: {
        ok: (info: IdCardInfo) => R;
        fail: (err: Error) => R;
    }
): R {
    const match = /^\d{6}(\d{4})(\d{2})(\d{2})\d{3}[\dx]$/i.exec(v);
    if (match) {
        const year = parseInt(remove_leading_zero(match[1]));
        const month = parseInt(remove_leading_zero(match[2]));
        const date = parseInt(remove_leading_zero(match[3]));
        const age = Math.max(0, new Date().getFullYear() - year);
        return cb.ok({
            year,
            month,
            date,
            age
        });
    } else {
        return cb.fail(new Error("invalid format"));
    }
}
function remove_leading_zero(v: string) {
    return v.replace(/^0+/, "");
}
