import { Logger } from "../../logger.js";
import { axios } from "../axios.js";
// import { axios_like_post } from "./axios_like_post";
// deprecated
export async function post_json_deprecated<T = any>(url: string, data: any): Promise<T> {
    const res = await axios.post(url, data);
    return res.data;
}
export async function post_json<T, R>(
    plog: Logger,
    input: {
        url: string;
        url_params?: {
            [key: string]: string;
        };
        headers?: {
            [key: string]: string;
        };
        proxy?: {
            hostname: string;
            port: number;
            auth?: {
                username: string;
                password: string;
            };
            protocol?: string;
        };
        data: any;
    },
    cb: {
        ok: (output: T) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("post_json");
    log.variable_debug("input", input);
    const { url, url_params, headers, proxy, data } = input;
    log.variable("url", url);
    log.variable("url_params", url_params);
    log.variable("headers", headers);
    log.variable("proxy", proxy);
    log.variable("data", data);
    try {
        // DEBUG (proxy)
        // const res = await axios_like_post(url, data, {
        const res = await axios.post(url, data, {
            params: url_params || {},
            headers,
            proxy: proxy
                ? {
                      host: proxy.hostname, // yes, the axios proxy field "host" should be "hostname" actually
                      ...proxy
                  }
                : undefined
        });
        const output = res.data;
        log.variable_debug("output", output);
        return cb.ok(output);
    } catch (err) {
        const res: any = err.response;
        if (res) {
            log.variable("res.status", res.status);
            log.variable("res.statusText", res.statusText);
            log.variable("res.headers", res.headers);
            log.variable("res.data", res.data);
        }
        log.error(err);
        log.mark_known(err); // convert to known error (don't display same error again)
        return cb.fail(err);
    }
}
