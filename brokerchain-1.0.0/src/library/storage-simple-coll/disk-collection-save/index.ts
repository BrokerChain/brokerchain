// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";
import { prompts } from "../../../myutils/index.js";
import { read_json_file } from "../../../myutils/node/file/index.js";
import { Input, Output, check_input, OutputOk } from "./type.js";
import { core } from "./core.js";
import { rpc_disk_collection_save } from "./rpc/client.js";
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
            await rpc_disk_collection_save(
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
        ok: (v: { namespace: string; key: string; metadata: { [key: string]: any }; items: { id: string; [key: string]: any }[] }) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("make_input_from_prompts");
    try {
        var v: { namespace: string; key: string; metadata: { [key: string]: any }; items: { id: string; [key: string]: any }[] } = {
            namespace: await input_namespace(log.sub("namespace"), {
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            }),
            key: await input_key(log.sub("key"), {
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            }),
            metadata: await input_metadata(log.sub("metadata"), {
                ok: (v) => v,
                fail: (err) => {
                    throw err;
                }
            }),
            items: await input_items(log.sub("items"), {
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

    async function input_namespace<R>(plog: Logger, cb: { ok: (v: string) => R; fail: (err: Error) => R }): Promise<R> {
        const log = plog.sub("input_namespace");
        // FIXME implement all string constrains here
        const v = await prompts.input_string("namespace", { allow_empty: true });
        return cb.ok(v);
    }

    async function input_key<R>(plog: Logger, cb: { ok: (v: string) => R; fail: (err: Error) => R }): Promise<R> {
        const log = plog.sub("input_key");
        // FIXME implement all string constrains here
        const v = await prompts.input_string("key", { allow_empty: true });
        return cb.ok(v);
    }

    async function input_metadata<R>(plog: Logger, cb: { ok: (v: { [key: string]: any }) => R; fail: (err: Error) => R }): Promise<R> {
        const log = plog.sub("input_metadata");
        try {
            var v: { [key: string]: any } = {};
        } catch (err) {
            log.error(err);
            return cb.fail(err);
        }

        return cb.ok(v);
    }

    async function input_items<R>(plog: Logger, cb: { ok: (v: { id: string; [key: string]: any }[]) => R; fail: (err: Error) => R }): Promise<R> {
        const log = plog.sub("input_items");
        const length = await prompts.input_number("(array.length) items");
        const list: { id: string; [key: string]: any }[] = [];
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

        async function input_item<R>(plog: Logger, cb: { ok: (v: { id: string; [key: string]: any }) => R; fail: (err: Error) => R }): Promise<R> {
            const log = plog.sub("input_item");
            try {
                var v: { id: string; [key: string]: any } = {
                    id: await input_id(log.sub("id"), {
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

            async function input_id<R>(plog: Logger, cb: { ok: (v: string) => R; fail: (err: Error) => R }): Promise<R> {
                const log = plog.sub("input_id");
                // FIXME implement all string constrains here
                const v = await prompts.input_string("id", { allow_empty: true });
                return cb.ok(v);
            }
        }
    }
}