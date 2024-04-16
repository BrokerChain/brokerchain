export async function sequence<T = any>(promiseList: (() => Promise<T>)[]): Promise<T[]> {
    const list: T[] = [];
    for (let i = 0; i < promiseList.length; ++i) {
        const promise = promiseList[i];
        const result = await promise();
        list.push(result);
    }
    return list;
}
