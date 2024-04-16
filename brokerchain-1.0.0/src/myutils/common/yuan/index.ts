export function cent_to_yuan(v: number) {
    return v / 100;
}
export function yuan_to_cent(v: number) {
    return v * 100;
}
export function display_price_in_yuan(opts: {
    price_in_cent: number;
    need_positive_sign?: boolean;
    hide_rmb_sign?: boolean;
    fraction_digits: number;
    cut_tail_fraction_digits?: boolean; // eg. 1.20 => 1.2; 1.00 => 1;
}) {
    const rmb_sign = opts.hide_rmb_sign ? "" : "\uFFE5";
    const { price_in_cent, need_positive_sign, fraction_digits } = opts;
    if (Number.isNaN(price_in_cent) || !Number.isFinite(price_in_cent)) {
        return "\u65E0\u6548\u6570\u5B57";
    } else if (price_in_cent < 0) {
        const price_in_yuan = price_in_cent / 100;
        const str = cut_tail_if_needed(price_in_yuan.toFixed(fraction_digits));
        return `-${rmb_sign}${str}`;
    } else {
        const price_in_yuan = price_in_cent / 100;
        const str = cut_tail_if_needed(price_in_yuan.toFixed(fraction_digits));
        return need_positive_sign ? `+${rmb_sign}${str}` : `${rmb_sign}${str}`;
    }
    function cut_tail_if_needed(v: string) {
        if (opts.cut_tail_fraction_digits) {
            let result = v;
            result = result.replace(/0+$/, "");
            result = result.replace(/\.$/, "");
            return result;
        } else {
            return v;
        }
    }
}
// 在元级别进行向上取整，比如 11.1 元变成 12 元
// 但是输入参数和输出都是分，所以输入 1110 输出 1200
export function ceil_in_yuan_level(cents: number) {
    const yuan = Math.ceil(cents / 100);
    return yuan * 100;
}
// 在元级别进行向下取整，比如 11.1 元变成 11 元
// 但是输入参数和输出都是分，所以输入 1110 输出 1100
export function floor_in_yuan_level(cents: number) {
    const yuan = Math.floor(cents / 100);
    return yuan * 100;
}
