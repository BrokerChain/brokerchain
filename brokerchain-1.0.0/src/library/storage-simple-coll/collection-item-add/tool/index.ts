// auto generated by dev/system

export function make_input(cb?: (o: { namespace: string; key: string; item: { id: string; [key: string]: any } }) => void): {
    namespace: string;
    key: string;
    item: { id: string; [key: string]: any };
} {
    const item: { namespace: string; key: string; item: { id: string; [key: string]: any } } = { namespace: "", key: "", item: { id: "" } };
    if (cb) {
        cb(item);
    }
    return item;
}

export function make_output_ok(cb?: (o: {}) => void): {} {
    const item: {} = {};
    if (cb) {
        cb(item);
    }
    return item;
}
