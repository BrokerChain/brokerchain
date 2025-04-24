import { Logger } from "../../logger.js";
import { axios } from "../axios.js";

export async function get_text<R>(
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
        ok: (output: string) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("get_text");
    try {
        log.variable_debug("input", input);
        const { url, url_params, headers, proxy } = input;
        log.variable("url", url);
        log.variable("url_params", url_params);
        log.variable("headers", headers);
        log.variable("proxy", proxy);
        const res = await axios.get(url, {
            responseType: "text",
            params: url_params || {},
            headers,
            proxy: proxy
                ? {
                      host: proxy.hostname, // yes, the axios proxy field "host" should be "hostname" actually
                      ...proxy
                  }
                : undefined
        });
        const output: string = res.data;
        log.variable_debug("output", output);
        if (typeof output !== "string") {
            throw log.new_error("unexpected response, expected string, got: " + typeof output);
        }

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
