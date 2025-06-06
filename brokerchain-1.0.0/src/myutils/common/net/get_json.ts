import { Logger } from "../../logger.js";
import { axios } from "../axios.js";

// deprecated
export async function get_json_deprecated<T = any>(url: string): Promise<T> {
    const res = await axios.get(url);
    return res.data;
}
export async function get_json<T, R>(
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
    },
    cb: {
        ok: (output: T) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("get_json");
    log.variable_debug("input", input);
    const { url, url_params, headers, proxy } = input;
    log.variable("url", url);
    log.variable("url_params", url_params);
    log.variable("headers", headers);
    log.variable("proxy", proxy);
    try {
        const res = await axios.get(url, {
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
