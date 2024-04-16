export function assert(cond: boolean, msg?: string) {
    if (!cond) {
        throw new Error(msg);
    }
}
export function shouldLengthEqual(
    a: {
        length: number;
    },
    b: {
        length: number;
    }
) {
    assert(a.length === b.length, "Required: a.length === b.length");
}
export function mustInteger(value: number) {
    assert(Number.isInteger(value), "Not Integer: " + value);
}
export function mustLengthInteger(value: number) {
    assert(Number.isInteger(value) && value >= 0, "Not Length Integer: " + value);
}
export function tabIn(str: string) {
    return str
        .split("\n")
        .map((line) => "\t" + line)
        .join("\n");
}
export function to16Bits(v: number) {
    const seqs = v.toString(2).split("");
    if (seqs.length > 16) {
        throw new Error("Too Long");
    }
    for (let count = 16 - seqs.length; count > 0; --count) {
        seqs.unshift("0");
    }
    return "0b" + seqs.join("");
}
export function range(from_include: number, to_exclude: number) {
    const list: number[] = [];
    for (let i = from_include; i < to_exclude; ++i) {
        list.push(i);
    }
    return list;
}
