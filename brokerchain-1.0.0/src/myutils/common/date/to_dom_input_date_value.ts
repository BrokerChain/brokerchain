// convert date object to DOM input[type="date"].value "YYYY-MM-DD"
export function to_dom_input_date_value(d: Date): string {
    return [
        // YYYY
        d.getFullYear().toString().padStart(4, "0"),
        // MM
        (d.getMonth() + 1).toString().padStart(2, "0"),
        // DD
        d.getDate().toString().padStart(2, "0")
    ].join("-");
}
