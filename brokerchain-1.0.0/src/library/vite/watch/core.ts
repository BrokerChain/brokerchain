// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import * as dir from "../../../myutils/node/dir/index.js";
import { Input, Output, Callback } from "./type.js";
import { createServer, ProxyOptions, InlineConfig } from "vite";
import * as path from "node:path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export async function core<R>(plog: Logger, input: Input & { setup?: (config: InlineConfig) => void }, cb: Callback<R>): Promise<R> {
    const log = plog.sub("vite.watch");
    log.variable("input", input);

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
            proxy
        },
        build: {
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

    // never return
    await new Promise((resolve) => {
        // never resolve...
    });

    return cb.ok({});
}
