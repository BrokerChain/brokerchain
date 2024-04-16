let next_real_name = 0;
export function random_real_name() {
    const list = [
        "\u8D3A\u5F18\u81F4",
        "\u5B54\u660E\u6770",
        "\u6BDB\u82F1\u5F66",
        "\u4F55\u98DE\u7FF0",
        "\u82CF\u535A\u8D61",
        "\u949F\u627F\u8F7D",
        "\u8303\u5F00\u9701",
        "\u4F59\u5609\u8302",
        "\u9A6C\u6587\u5BA3",
        "\u5B59\u661F\u6CB3",
        "\u8521\u6D69\u5E7F",
        "\u674E\u4FCA\u8C6A",
        "\u6797\u826F\u54F2",
        "\u8463\u6DB5\u6DA6",
        "\u59DC\u9AD8\u5CEF",
        "\u6731\u4E50\u6C60",
        "\u65B9\u5B89\u987A",
        "\u90B5\u4FCA\u6750",
        "\u949F\u6B23\u60A6",
        "\u5F90\u9E3F\u714A",
        "\u5218\u5174\u5B89",
        "\u4F59\u627F\u6559",
        "\u5B8B\u5143\u5FB7",
        "\u4F55\u548F\u5FB7",
        "\u5F90\u5929\u7984",
        "\u4F59\u5B89\u5FD7",
        "\u4E01\u777F\u5E7F",
        "\u6797\u6D69\u521D",
        "\u9093\u5929\u548C",
        "\u94B1\u9510\u667A",
        "\u949F\u5929\u4F51",
        "\u90B5\u5EFA\u7AE0",
        "\u66F9\u5411\u7B1B",
        "\u53F2\u4FE1\u745E",
        "\u590F\u6657\u65E5",
        "\u718A\u5F6C\u5F6C",
        "\u9F9A\u6CE2\u6D9B",
        "\u987E\u6CF0\u9E3F",
        "\u5085\u5149\u8FDC",
        "\u6731\u4FCA\u4FA0",
        "\u9ECE\u5609\u8D50",
        "\u987E\u660E\u667A",
        "\u6BB5\u5947\u8FC8",
        "\u90B9\u6CFD\u5B87",
        "\u9F9A\u5EFA\u767D",
        "\u90B9\u535A\u6613",
        "\u5468\u66FE\u742A",
        "\u5434\u96C5\u61FF",
        "\u5434\u51EF\u5B89",
        "\u90D1\u5FD7\u52C7",
        "\u90DD\u540C\u65B9",
        "\u6BB5\u5B50\u6C11",
        "\u8881\u96C5\u60E0",
        "\u4EFB\u548C\u5B9C",
        "\u80E1\u534E\u91C7",
        "\u8463\u9633\u6714",
        "\u51AF\u535A\u8FBE",
        "\u9F9A\u548C\u5B9C",
        "\u960E\u9ECE\u660E",
        "\u7F57\u98DE\u5C18",
        "\u80E1\u660E\u6770",
        "\u5ED6\u5B8F\u7545",
        "\u5B54\u826F\u670B",
        "\u8463\u540C\u548C",
        "\u97E9\u5FB7\u6DA6",
        "\u5F20\u6E29\u8302",
        "\u5B8B\u826F\u5DE5",
        "\u7F57\u670B\u5174",
        "\u767D\u5B8F\u9088",
        "\u7530\u548C\u9882",
        "\u8303\u4E50\u548C",
        "\u8C2D\u6210\u5929",
        "\u674E\u9E4F\u8D4B",
        "\u859B\u8302\u5FB7",
        "\u4E8E\u666F\u8F89",
        "\u6768\u51EF\u5EB7",
        "\u5B54\u96C5\u7545",
        "\u8C2D\u521A\u6BC5",
        "\u8D56\u5411\u660E",
        "\u65B9\u4E50\u4EBA",
        "\u90DD\u5B8F\u76DB",
        "\u5D14\u660A\u7A79",
        "\u8BB8\u4E50\u7AE5",
        "\u5B54\u5929\u4F51",
        "\u6BB5\u7ECF\u7EAC",
        "\u94B1\u660E\u5586",
        "\u9ECE\u6B63\u5E73",
        "\u674E\u6587\u745E",
        "\u5362\u5B9C\u5E74",
        "\u66FE\u666F\u6F84",
        "\u5510\u826F\u9A8F",
        "\u5362\u535A\u6D9B",
        "\u5B54\u540C\u5149",
        "\u8D3E\u9AD8\u8D85",
        "\u53F6\u9510\u601D",
        "\u6797\u5174\u4FEE",
        "\u6C6A\u5609\u8BB8",
        "\u6731\u5B89\u6F9C",
        "\u5085\u6EA5\u5FC3",
        "\u5D14\u4FCA\u695A"
    ];
    const name = list[next_real_name];
    next_real_name += 1;
    if (next_real_name > list.length - 1) {
        next_real_name = 0;
    }
    return name;
}
export function random_avatar_url(tag: string) {
    return `https://i.pravatar.cc/128?u=${encodeURIComponent(tag)}`;
}
export function random_gender() {
    return Math.random() < 0.5 ? "male" : "female";
}
export function random_minip_gender() {
    return Math.random() < 0.5 ? 1 : 2;
}
export function random_birthday() {
    return "1988-01-02";
}
export function random_phone() {
    return "182" + Math.random().toString().substring(2, 10);
}
export function random_tag_list() {
    const list: string[] = [];
    for (let i = 0; i < 10; ++i) {
        list.push(`tag${i}`);
    }
    return list;
}
export function random_attribute(): {
    [key: string]: string;
} {
    return {};
}
export function random_boolean() {
    return Math.random() < 0.5 ? true : false;
}
type RandomDoFun<R> = () => R;
export function random_do<R>(items: RandomDoFun<R>[]): R {
    if (items.length < 1) {
        throw new Error("invalid empty items");
    }
    const i = Math.floor(Math.random() * items.length);
    const target = items[i];
    return target();
}
export function random_pick<T>(
    items: T[],
    empty_cb: () => T = () => {
        throw new Error("random_pick empty input");
    }
): T {
    if (items.length === 0) return empty_cb();
    const i = Math.floor(Math.random() * items.length);
    const target = items[i];
    return target;
}
export function random_resident_card_number() {
    return "11010119200804999X";
}
