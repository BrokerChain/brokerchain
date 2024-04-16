export function to_params(obj: { [key: string]: string }): string {
    const enc = encodeURIComponent;
    const list: string[] = [];
    Object.keys(obj).forEach((name) => {
        const value = obj[name] || "";
        list.push(`${enc(name)}=${enc(value)}`);
    });
    return list.join("&");
}
