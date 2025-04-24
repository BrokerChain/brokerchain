// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import * as dir from "../../../myutils/node/dir/index.js";
import { Input, Output, Callback } from "./type.js";
import { build as vite_build, InlineConfig } from "vite";
import * as path from "node:path";
import tailwindcss from "@tailwindcss/vite";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
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
                input: rollup_input,
                // Chrome extensions need this feature to output a simple JavaScript filename
                output: input.output_filename_pattern
                    ? {
                          entryFileNames: input.output_filename_pattern.entry_filename
                      }
                    : undefined
            }
        },
        plugins: [tailwindcss()]
    };
    log.variable("config", config);

    await vite_build(config);

    return cb.ok({});
}
