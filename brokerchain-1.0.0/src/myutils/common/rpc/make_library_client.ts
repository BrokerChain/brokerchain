import { Logger } from "../../logger.js";
import { make_proxy } from "./make_proxy.js";
import { post_json } from "../net/post_json.js";

export function make_library_client<T>(library_name: string, base_url = "") {
    return make_proxy<T>(async (method, args) => {
        const plog = args[0] as Logger;
        if (typeof plog !== "object" || plog === null) {
            throw new Error("invalid arguments[0], must be object");
        }

        const input = args[1];
        if (typeof input !== "object" || input === null) {
            throw new Error("invalid arguments[1], must be object");
        }

        const cb: { [key: string]: (...args: any[]) => any } = args[2]; // like {ok: (output) => R; fail: (err) => R; ...}
        if (typeof cb !== "object" || cb === null) {
            throw new Error("invalid arguments[2], must be object");
        } else if (typeof cb.fail !== "function") {
            throw new Error(
                "invalid arguments[2], must contains fail case handler" // fail is always needed
            );
        }

        const fun_name = method.replace(/_/g, "-"); // eg. "article_ls" -> "article-ls"
        const log = plog.sub("client").sub(`${library_name}.${fun_name}`);
        try {
            log.variable_debug("input", input);
            const url = base_url + `/library/${library_name}/${fun_name}`;
            log.variable_debug("url", url);

            const { case_name, case_output } = await post_json(
                log,
                {
                    url,
                    data: input
                },
                {
                    ok: (res: { [key: string]: any }) => {
                        log.variable_debug("res", res);
                        if (typeof res !== "object" && res !== null) {
                            throw log.new_error("unexpected server response, the type must be object");
                        }
                        const case_name_list = Object.keys(res);
                        if (case_name_list.length !== 1) {
                            throw log.new_error("unexpected server response, the case name list length must be exactly 1");
                        }
                        const case_name: string = case_name_list[0];
                        const case_output: { [key: string]: any } = res[case_name];

                        // well, the fail case is special, convert it to an local Error object
                        if (case_name === "fail") {
                            if (typeof case_output !== "object" || case_output === null) {
                                throw log.new_error("unexpected server response, the fail case data must be object");
                            }
                            const message = case_output.message; // {fail: {message: "..."}}
                            if (typeof message !== "string") {
                                throw log.new_error("unexpected server response, the fail case data must contains .message field");
                            }
                            return {
                                case_name,
                                case_output: new Error(message)
                            };
                        } else {
                            return { case_name, case_output };
                        }
                    },
                    fail: (err) => {
                        throw err;
                    }
                }
            );

            const callback_handler = cb[case_name];
            if (typeof callback_handler !== "function") {
                throw log.new_error("invalid callback handler, it's type must be function");
            }

            return callback_handler(case_output);
        } catch (err) {
            log.print_unknown_error(err);
            return cb.fail(err);
        }
    });
}
