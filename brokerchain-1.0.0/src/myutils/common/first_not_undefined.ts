export function first_not_undefined(...values: any[]): any {
    for (const item of values) {
        if (item !== undefined) {
            return item; // item can be null, it's ok
        }
    }
    return undefined;
}
