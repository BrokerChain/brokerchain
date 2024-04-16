import * as net from "node:net";
import * as tls from "node:tls";
import * as fs from "node:fs";
import * as liburl from "node:url";
import { v1 as uuid } from "uuid";
import { Logger } from "./logger.js";
import * as dir from "./node/dir/index.js";
export * from "./browser/index.js";
import * as _prompts from "./node/prompts.js";
export const prompts = _prompts;
export * from "./node/compress.js";
export function to_query_string(params: [string, string][]) {
    return params.map(([name, value]) => encodeURIComponent(name) + "=" + encodeURIComponent(value)).join("&");
}
// function logError(logger: Logger, errSource) {
//     errSource.on("error", err => {
//         logger.println(err.toString());
//     });
// }
export function random_node_name() {
    return "node_" + uuid().replace(/-/g, "").substring(0, 8);
}
export function load<T = any>(
    plog: Logger,
    filename: string,
    opt?: {
        validator?: (value: any) => void;
        fallback?: () => T;
    }
): T {
    const log = plog.sub("load");
    filename = dir.resolve(dir.src, filename);
    log.variable("filename", filename);
    const handleFail = (reason: string, err: any) => {
        if (opt && opt.fallback) {
            log.error(reason + ", return fallback");
            const result = opt.fallback();
            if (opt.validator) {
                opt.validator(result);
            }
            log.variable("result", result);
            return result;
        } else {
            log.error(reason + ", no fallback provided, will throw exception");
            throw err;
        }
    };
    try {
        var content = fs.readFileSync(filename, "utf8");
        log.variable("content", content);
    } catch (err) {
        return handleFail("load file fail", err);
    }
    try {
        var result = JSON.parse(content);
        log.variable("result", result);
    } catch (err) {
        return handleFail("parse file fail", err);
    }
    if (opt && opt.validator) {
        opt.validator(result);
    }
    return result;
}
export function log_stream(logger: Logger, source: any) {
    // common events
    source.on("close", () => {
        logger.println("close");
    });
    source.on("error", (err: any) => {
        logger.println(err.toString());
    });
    // readable stream events
    // source.on("readable", () => {
    //     logger.println("readable");
    // });
    // source.on("data", chunk => {
    //     logger.println("data " + chunk.length + " Bytes");
    // });
    source.on("end", () => {
        logger.println("end");
    });
    // writable stream events
    source.on("pipe", () => {
        logger.println("pipe");
    });
    source.on("unpipe", () => {
        logger.println("unpipe");
    });
    source.on("drain", () => {
        logger.println("drain");
    });
    source.on("finish", () => {
        logger.println("finish");
    });
}
export function connect(
    plog: Logger,
    opt: {
        host: string;
        port: number;
        ssl?: boolean;
    }
): Promise<net.Socket> {
    const log = plog.sub("connect");
    log.args(opt);
    return new Promise<net.Socket>((resolve, reject) => {
        let finish = false;
        let on_error = (err: any) => {
            if (finish) {
                // ignore
            } else {
                log.error(err);
                reject(err);
            }
        };
        let on_connect = () => {
            finish = true;
            log.ok();
            log_stream(log, socket);
            socket.removeListener("error", on_error); // never forget
            resolve(socket);
        };
        let socket: net.Socket = opt.ssl
            ? tls.connect(
                  {
                      host: opt.host,
                      port: opt.port,
                      rejectUnauthorized: false // TODO fix this security problem!
                  },
                  on_connect
              )
            : net.connect({ host: opt.host, port: opt.port }, on_connect);
        socket.once("error", on_error);
    });
}
export function read_socket(plog: Logger, socket: net.Socket): Promise<Buffer> {
    const log = plog.sub("read");
    return new Promise<Buffer>((resolve, reject) => {
        let finish = false;
        let errorListener = (err: any) => {
            if (finish) {
                // ignore
            } else {
                log.error(err);
                reject(err);
            }
        };
        socket.once("data", (data) => {
            finish = true;
            log.ok();
            socket.removeListener("error", errorListener);
            resolve(data);
        });
    });
}
export async function request_open_tunnel(plog: Logger, socket: net.Socket, host: string, port: number): Promise<boolean> {
    const log = plog.sub("request-open-tunnel");
    log.variable("host", host);
    log.variable("port", port);
    const req = [`CONNECT ${host}:${port} HTTP/1.1`, `Host: ${host}:${port}`, "\r\n"].join("\r\n");
    log.variable("request", req);
    socket.write(Buffer.from(req));
    let res = "";
    while (true) {
        log.println("read response chunk...");
        const chunk = await read_socket(log, socket);
        res += chunk.toString("utf8");
        // log.variable("response chunk", chunk.toString("utf8"));
        log.variable("response", res);
        if (log.condition("does response conntains \\r\\n\\r\\n?", () => res.indexOf("\r\n\r\n") !== -1)) {
            if (log.condition("is 200 response", () => /^HTTP\/1\.1 200 /.test(res))) {
                // success
                return log.variable("return", true);
            } else {
                // fail
                return log.variable("return", false);
            }
        }
        // TODO limit size & waiting time
    }
}
export async function create_tunnel_on_next_proxy(
    plog: Logger,
    opt: {
        proxy: string;
        host: string;
        port: number;
    }
): Promise<net.Socket> {
    let log = plog.sub("create-tunnel-on-next-proxy");
    let url = liburl.parse(opt.proxy);
    let proxyHost = url.hostname; // without port
    let proxyPort = url.port
        ? parseInt(url.port) // fix: negtive or zero number? or not integer?
        : url.protocol === "https:"
        ? 443
        : 80;
    log.variable("proxy", opt.proxy);
    log.variable("proxy host", proxyHost);
    log.variable("proxy port", proxyPort);
    log.variable("target host", opt.host);
    log.variable("target port", opt.port);
    const socket = await log.action(
        "connect to proxy",
        async () =>
            await connect(log, {
                host: proxyHost,
                port: proxyPort
            })
    );
    await log.action("open tunnel on proxy", async () => await request_open_tunnel(log, socket, opt.host, opt.port));
    return socket;
}
// // test
// (async () => {
//     try {
//         const socket = await createTunnelOnNextProxy(new Logger("test"), {
//             // "http://localhost:1234"
//             proxy:
//                 // "http://localhost:6152"
//                 "http://localhost:8888",
//             host: "bing.com",
//             port: 443
//         });
//     } catch (err) {
//         // ignore
//     }
// })();
