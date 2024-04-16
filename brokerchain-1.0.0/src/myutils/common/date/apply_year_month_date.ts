// only change year month data, but keep hour minute second ms
export function apply_year_month_date(from: Date, to: Date) {
    const result = new Date(to.valueOf());
    result.setFullYear(from.getFullYear());
    result.setMonth(from.getMonth());
    result.setDate(from.getDate());
    return result;
}
