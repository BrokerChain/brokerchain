export function apply_path_parameter(
    url: string,
    path_params: {
        [key: string]: string;
    }
) {
    const url_obj = new URL(url);
    const pathname = url_obj.pathname;
    const new_pathname = pathname
        .split("/")
        .map((item) => {
            if (!/^\:/.test(item)) return item;
            const var_name = item.slice(1); // empty var_name is ok
            const var_value = path_params[var_name];
            return var_value;
        })
        .join("/");
    url_obj.pathname = new_pathname;
    return url_obj.toString();
}
