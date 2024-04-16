export function match(
    text: string,
    regexp: RegExp,
    map?: {
        [key: string]: (item: string, i: number) => void;
    }
): boolean {
    const items = regexp.exec(text);
    if (!items) {
        return false;
    }
    if (map) {
        items.forEach((item, i) => {
            if (map[i]) {
                map[i](item, i);
            }
            // special
            if (map["*"]) {
                map["*"](item, i);
            }
        });
    }
    return true;
}
export function match2(text: string, regexp: RegExp, cb?: (item: string, i: number) => void): boolean {
    const items = regexp.exec(text);
    if (!items) {
        return false;
    }
    if (cb) {
        items.forEach((item, i) => {
            cb(item, i);
        });
    }
    return true;
}
export function pad_leading_zero(str: string, to_length: number) {
    if (str.length >= to_length) return str;
    const leading_length = to_length - str.length;
    const list: string[] = [];
    for (let i = 0; i < leading_length; ++i) {
        list.push("0");
    }
    return list.join("") + str;
}
