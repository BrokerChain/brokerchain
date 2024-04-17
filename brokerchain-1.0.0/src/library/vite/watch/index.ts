// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";
import { prompts } from "../../../myutils/index.js";
import { read_json_file } from "../../../myutils/node/file/index.js";
import { Input, Output, check_input, OutputOk } from "./type.js";
import { core } from "./core.js";
import { rpc_watch } from "./rpc/client.js";
import yargs from "yargs";

const log = new Logger("cli");
run();

async function run() {
    try {
        const { input, server } = await make_input(log, {
            ok: async (input: Input, server) => {
                return { input, server };
            },
            fail: async (err) => {
                throw err;
            }
        });

        if (server) {
            await rpc_watch(
                log,
                {
                    server,
                    input
                },
                {
                    ok: (output) => {
                        log.variable("output", output);
                        console.log("😄 ok");
                    },

                    fail: (err) => {
                        throw err;
                    }
                }
            );
        } else {
            await core(log, input, {
                ok: (output: OutputOk) => {
                    log.variable("output", output);
                    console.log("😄 ok");
                },

                fail: (err) => {
                    throw err;
                }
            });
        }
    } catch (err) {
        log.print_unknown_error(err);
        console.log("😢 fail.");
    }
}

async function make_input<R>(
    plog: Logger,
    cb: {
        ok: (input: Input, rpc_server: string) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("make_input");

    const args = await yargs(process.argv.slice(2))
        .option("input", {
            type: "string",
            description: "Specify the JSON input directly as a command line argument."
        })
        .option("input-file", {
            type: "string",
            description: "Provide the name of a JSON file from which to read the input."
        })
        .option("server", {
            type: "string",
            description: "Provide the URL of a remote server to send the request to."
        })
        .parse();

    const input = args.input || process.env["x_input"];
    log.variable("input", input);

    const input_file = args.inputFile || process.env["x_input_file"];
    log.variable("input_file", input_file);

    const server = args.server || process.env["x_server"];
    log.variable("x_server", server);

    if (input && input_file) {
        return cb.fail(log.new_error("Conflicting arguments provided. You can use either --input or --input-file, but not both at the same time."));
    }

    if (input) {
        return make_input_from_args(
            log,
            { json_text: input },
            {
                ok: (input) => {
                    return cb.ok(input, server);
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            }
        );
    } else if (input_file) {
        return make_input_from_file(
            log,
            { filename: input_file },
            {
                ok: (input) => {
                    return cb.ok(input, server);
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            }
        );
    } else {
        return make_input_from_prompts(log, {
            ok: (input) => {
                return cb.ok(input, server);
            },
            fail: (err) => {
                return cb.fail(err);
            }
        });
    }
}

async function make_input_from_args<R>(
    plog: Logger,
    opts: { json_text: string },
    cb: {
        ok: (input: Input) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("make_input_from_args");
    try {
        const input = JSON.parse(opts.json_text);
        log.variable("input", input);

        return check_input(log, input, {
            ok: () => {
                return cb.ok(input);
            },
            fail: (err) => {
                return cb.fail(err);
            }
        });
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}

async function make_input_from_file<R>(
    plog: Logger,
    opts: { filename: string },
    cb: {
        ok: (input: Input) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("make_input_from_file");
    return read_json_file(log, opts.filename, {
        ok: (input) => {
            return check_input(log, input, {
                ok: () => {
                    return cb.ok(input);
                },
                fail: (err) => {
                    return cb.fail(err);
                }
            });
        },
        fail: (err) => {
            return cb.fail(err);
        }
    });
}

async function make_input_from_prompts<R>(
    plog: Logger,
    cb: {
        ok: (v: {
            root_dir: string;
            entry_html_list?: { name: string; path: string }[];
            proxy_list?: { source_path: string; target_server: string; change_origin: boolean }[];
            tailwindcss?: { [key: string]: any };
            port: number;
        }) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("make_input_from_prompts");
    try {
        var v: {
            root_dir: string;
            entry_html_list?: { name: string; path: string }[];
            proxy_list?: { source_path: string; target_server: string; change_origin: boolean }[];
            tailwindcss?: { [key: string]: any };
            port: number;
        } = {
            root_dir: await input_root_dir(log.sub("root_dir"), {
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            }),
            entry_html_list: await skip_or_input("entry_html_list", () =>
                input_entry_html_list(log.sub("entry_html_list"), {
                    ok: (v) => v,
                    fail: (err) => {
                        throw err;
                    }
                })
            ),
            proxy_list: await skip_or_input("proxy_list", () =>
                input_proxy_list(log.sub("proxy_list"), {
                    ok: (v) => v,
                    fail: (err) => {
                        throw err;
                    }
                })
            ),
            tailwindcss: await skip_or_input("tailwindcss", () =>
                input_tailwindcss(log.sub("tailwindcss"), {
                    ok: (v) => v,
                    fail: (err) => {
                        throw err;
                    }
                })
            ),
            port: await input_port(log.sub("port"), {
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            })
        };
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }

    return cb.ok(v);

    async function input_root_dir<R>(plog: Logger, cb: { ok: (v: string) => R; fail: (err: Error) => R }): Promise<R> {
        const log = plog.sub("input_root_dir");
        // FIXME implement all string constrains here
        const v = await prompts.input_string("root_dir", { allow_empty: true });
        return cb.ok(v);
    }

    async function input_entry_html_list<R>(plog: Logger, cb: { ok: (v: { name: string; path: string }[]) => R; fail: (err: Error) => R }): Promise<R> {
        const log = plog.sub("input_entry_html_list");
        const length = await prompts.input_number("(array.length) entry_html_list");
        const list: { name: string; path: string }[] = [];
        for (let i = 0; i < length; ++i) {
            const err = await input_item(log, {
                ok: (item) => {
                    list.push(item);
                    return null;
                },
                fail: (err) => {
                    return err;
                }
            });

            if (err) {
                return cb.fail(err);
            }
        }

        return cb.ok(list);

        async function input_item<R>(plog: Logger, cb: { ok: (v: { name: string; path: string }) => R; fail: (err: Error) => R }): Promise<R> {
            const log = plog.sub("input_item");
            try {
                var v: { name: string; path: string } = {
                    name: await input_name(log.sub("name"), {
                        ok: (v) => v,
                        fail: (err) => {
                            throw err;
                        }
                    }),
                    path: await input_path(log.sub("path"), {
                        ok: (v) => v,
                        fail: (err) => {
                            throw err;
                        }
                    })
                };
            } catch (err) {
                log.error(err);
                return cb.fail(err);
            }

            return cb.ok(v);

            async function input_name<R>(plog: Logger, cb: { ok: (v: string) => R; fail: (err: Error) => R }): Promise<R> {
                const log = plog.sub("input_name");
                // FIXME implement all string constrains here
                const v = await prompts.input_string("name", { allow_empty: true });
                return cb.ok(v);
            }

            async function input_path<R>(plog: Logger, cb: { ok: (v: string) => R; fail: (err: Error) => R }): Promise<R> {
                const log = plog.sub("input_path");
                // FIXME implement all string constrains here
                const v = await prompts.input_string("path", { allow_empty: true });
                return cb.ok(v);
            }
        }
    }

    async function input_proxy_list<R>(
        plog: Logger,
        cb: { ok: (v: { source_path: string; target_server: string; change_origin: boolean }[]) => R; fail: (err: Error) => R }
    ): Promise<R> {
        const log = plog.sub("input_proxy_list");
        const length = await prompts.input_number("(array.length) proxy_list");
        const list: { source_path: string; target_server: string; change_origin: boolean }[] = [];
        for (let i = 0; i < length; ++i) {
            const err = await input_item(log, {
                ok: (item) => {
                    list.push(item);
                    return null;
                },
                fail: (err) => {
                    return err;
                }
            });

            if (err) {
                return cb.fail(err);
            }
        }

        return cb.ok(list);

        async function input_item<R>(
            plog: Logger,
            cb: { ok: (v: { source_path: string; target_server: string; change_origin: boolean }) => R; fail: (err: Error) => R }
        ): Promise<R> {
            const log = plog.sub("input_item");
            try {
                var v: { source_path: string; target_server: string; change_origin: boolean } = {
                    source_path: await input_source_path(log.sub("source_path"), {
                        ok: (v) => v,
                        fail: (err) => {
                            throw err;
                        }
                    }),
                    target_server: await input_target_server(log.sub("target_server"), {
                        ok: (v) => v,
                        fail: (err) => {
                            throw err;
                        }
                    }),
                    change_origin: await input_change_origin(log.sub("change_origin"), {
                        ok: (v) => v,
                        fail: (err) => {
                            throw err;
                        }
                    })
                };
            } catch (err) {
                log.error(err);
                return cb.fail(err);
            }

            return cb.ok(v);

            async function input_source_path<R>(plog: Logger, cb: { ok: (v: string) => R; fail: (err: Error) => R }): Promise<R> {
                const log = plog.sub("input_source_path");
                // FIXME implement all string constrains here
                const v = await prompts.input_string("source_path", { allow_empty: true });
                return cb.ok(v);
            }

            async function input_target_server<R>(plog: Logger, cb: { ok: (v: string) => R; fail: (err: Error) => R }): Promise<R> {
                const log = plog.sub("input_target_server");
                // FIXME implement all string constrains here
                const v = await prompts.input_string("target_server", { allow_empty: true });
                return cb.ok(v);
            }

            async function input_change_origin<R>(plog: Logger, cb: { ok: (v: boolean) => R; fail: (err: Error) => R }): Promise<R> {
                const log = plog.sub("input_change_origin");
                const v = await prompts.input_boolean("change_origin");
                return cb.ok(v);
            }
        }
    }

    async function input_tailwindcss<R>(plog: Logger, cb: { ok: (v: { [key: string]: any }) => R; fail: (err: Error) => R }): Promise<R> {
        const log = plog.sub("input_tailwindcss");
        try {
            var v: { [key: string]: any } = {};
        } catch (err) {
            log.error(err);
            return cb.fail(err);
        }

        return cb.ok(v);
    }

    async function input_port<R>(plog: Logger, cb: { ok: (v: number) => R; fail: (err: Error) => R }): Promise<R> {
        const log = plog.sub("input_port");
        // FIXME implement all number constrains here
        const v = await prompts.input_number("port");
        return cb.ok(v);
    }

    async function skip_or_input<R>(field: string, input_cb: () => Promise<R>): Promise<R | undefined> {
        const v = await prompts.input_string_enum(field, ["skip", "input"]);
        if (v === "input") {
            return input_cb();
        } else {
            return undefined;
        }
    }
}
