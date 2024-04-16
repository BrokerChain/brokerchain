export function date_end(d: Date) {
    const result = new Date(d.valueOf());
    result.setHours(23, 59, 59, 999);
    return result;
}
