export function display_date(v: string) {
    if (!v) return "\u672A\u77E5";
    return new Date(v).toLocaleDateString();
}

export function display_time(v: string) {
    if (!v) return "\u672A\u77E5";
    return new Date(v).toLocaleTimeString();
}

export function display_date_time(v: string) {
    if (!v) return "\u672A\u77E5";
    return new Date(v).toLocaleString();
}

export function display_date_cn(v: string) {
    if (!v) return "\u672A\u77E5";
    const d = new Date(v);
    return [d.getFullYear(), "\u5E74", d.getMonth() + 1, "\u6708", d.getDate(), "\u65E5"].join("");
}

export function display_time_cn(v: string) {
    if (!v) return "\u672A\u77E5";
    const d = new Date(v);
    const hh = d.getHours().toString();
    const mm = d.getMinutes().toString();
    return [pad_start_zero(hh, 2), ":", pad_start_zero(mm, 2)].join("");
}
function pad_start_zero(v: string, len: number) {
    if (v.length >= len) {
        return v;
    } else {
        let str = "";
        for (let i = 0; i < len; ++i) {
            str += "0";
        }
        return (str + v).slice(-1 * len);
    }
}
