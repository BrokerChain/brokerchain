// auto generated by dev/system

export function make_input(cb?: (o: { id: string }) => void): { id: string } {
    const item: { id: string } = { id: "" };
    if (cb) {
        cb(item);
    }
    return item;
}

export function make_output_none(
    cb?: (o: { peer: { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number } }) => void
): { peer: { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number } } {
    const item: { peer: { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number } } = {
        peer: { id: "", create_time: "", update_time: "", address: "", port: 0 }
    };
    if (cb) {
        cb(item);
    }
    return item;
}

export function make_output_ok(
    cb?: (o: { peer: { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number } }) => void
): { peer: { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number } } {
    const item: { peer: { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number } } = {
        peer: { id: "", create_time: "", update_time: "", address: "", port: 0 }
    };
    if (cb) {
        cb(item);
    }
    return item;
}
