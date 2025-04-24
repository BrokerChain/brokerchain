import { Logger } from "../logger.js";

export function get_url_search_params(plog: Logger) {
    const log = plog.sub("get_url_search_params");
    const params = new URLSearchParams(window.location.search);
    const result: { [key: string]: string } = {};
    params.forEach((value, name) => {
        result[name] = value;
    });
    log.variable("result", result);
    return result;
}
