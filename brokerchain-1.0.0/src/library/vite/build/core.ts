// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import * as dir from "../../../myutils/node/dir/index.js";
import { Input, Output, Callback } from "./type.js";
import { build as vite_build, InlineConfig } from "vite";
import * as path from "node:path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export async function core<R>(plog: Logger, input: Input, cb: Callback<R>): Promise<R> {
    const log = plog.sub("vite.build");
    log.variable("input", input);
    try {
        const root_dir_abs = path.resolve(input.root_dir);
        log.variable("root_dir_abs", root_dir_abs);

        const out_dir_abs = path.resolve(input.out_dir);
        log.variable("out_dir_abs", out_dir_abs);

        const rollup_input: { [key: string]: string } = {};
        if (input.entry_html_list) {
            for (const item of input.entry_html_list) {
                rollup_input[item.name] = dir.resolve(item.path);
            }
        }
        log.variable("rollup_input", rollup_input);
        log.variable("tailwindcss", input.tailwindcss);

        const config: InlineConfig = {
            configFile: false,
            root: root_dir_abs,
            base: "./",
            build: {
                outDir: out_dir_abs,
                emptyOutDir: input.empty_out_dir === undefined ? true : input.empty_out_dir,
                rollupOptions: {
                    input: rollup_input
                }
            },
            css: input.tailwindcss
                ? {
                      postcss: {
                          plugins: [(tailwindcss as any)(input.tailwindcss || {}), autoprefixer()]
                      }
                  }
                : undefined
        };
        log.variable("config", config);

        await vite_build(config);

        return cb.ok({});
    } catch (err) {
        log.print_unknown_error(err);
        return cb.fail(err);
    }
}
