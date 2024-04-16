import { sleep } from "../delay.js";
export async function for_each_slow<T = any>(list: T[], cb: (ele: T, i: number) => void) {
    for (let i = 0; i < list.length; ++i) {
        const ele = list[i];
        cb(ele, i);
        await sleep(0);
    }
}
