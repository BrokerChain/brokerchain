export function date_offset(d: Date, offset: number) {
    const result = new Date(d.valueOf());
    result.setDate(result.getDate() + offset);
    return result;
}
