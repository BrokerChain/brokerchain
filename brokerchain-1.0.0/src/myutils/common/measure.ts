export function measure<T = any>(name: string, exp: () => T): T {
    const begin = new Date();
    const ret = exp();
    const end = new Date();
    const delta = end.valueOf() - begin.valueOf();
    console.log("** measure(ms) **", name, delta);
    return ret;
}
