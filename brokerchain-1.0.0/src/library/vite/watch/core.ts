// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import * as dir from "../../../myutils/node/dir/index.js";
import { Input, Output, Callback } from "./type.js";
import { createServer, ProxyOptions, InlineConfig } from "vite";
import * as file_system from "../../file-system/export.js";
import * as path from "node:path";
import tailwindcss from "@tailwindcss/vite";

export async function core<R>(log: Logger, input: Input & { setup?: (config: InlineConfig) => void }, cb: Callback<R>): Promise<R> {
    const root_dir_abs = path.resolve(input.root_dir);
    log.variable("root_dir_abs", root_dir_abs);

    const rollup_input: { [key: string]: string } = {};
    if (input.entry_html_list) {
        for (const item of input.entry_html_list) {
            rollup_input[item.name] = dir.resolve(item.path);
        }
    }
    log.variable("rollup_input", rollup_input);

    const proxy: { [key: string]: ProxyOptions } = {};
    if (input.proxy_list) {
        for (const item of input.proxy_list) {
            proxy[item.source_path] = {
                target: item.target_server,
                changeOrigin: item.change_origin
            };
        }
    }
    log.variable("proxy", proxy);
    log.variable("tailwindcss", input.tailwindcss);

    const config: InlineConfig = {
        configFile: false,
        root: root_dir_abs,
        server: {
            port: input.port,
            proxy,
            watch: null // disable vite watcher (chokidar)
        },
        build: {
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
    if (input.setup) {
        input.setup(config);
    }
    log.variable("config", config);

    const server = await createServer(config);
    await server.listen();
    // server.printUrls();

    log.println(`http://localhost:${input.port}`);
    // print other entries
    if (input.entry_html_list) {
        for (const item of input.entry_html_list) {
            log.println(`http://localhost:${input.port}${item.path.substring(item.path.indexOf("/dist/"))}`);
        }
    }

    // watch file change
    const watch_root_dir = dir.dist;

    await file_system.watch(
        log,
        {
            path: watch_root_dir,
            recursive: true,
            callback: async (event, target_path) => {
                // // NOT working, vite cached the module contents
                // server.ws.send({
                //     type: "full-reload"
                // });
                // from vite source code
                // file = normalizePath(file);
                // reloadOnTsconfigChange(server, file);
                // await pluginContainer.watchChange(file, { event: "update" });
                // // invalidate module graph cache on file change
                // for (const environment of Object.values(server.environments)) {
                //     environment.moduleGraph.onFileChange(file);
                // }
                // await onHMRUpdate("update", file);
            }
        },
        {
            ok: (output) => {
                return output;
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    // never return
    await new Promise((resolve) => {
        // never resolve...
    });

    return cb.ok({});
}
