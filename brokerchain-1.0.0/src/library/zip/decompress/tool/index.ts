// auto generated by dev/system

export function make_input(cb?: (o: { from_file: string; to_path: string }) => void): { from_file: string; to_path: string } {
    const item: { from_file: string; to_path: string } = { from_file: "", to_path: "" };
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
