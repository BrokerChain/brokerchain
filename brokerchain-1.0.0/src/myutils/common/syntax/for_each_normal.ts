export async function for_each_normal<T = any>(list: T[], cb: (ele: T, i: number) => void) {
    list.forEach(cb);
}
