// auto generated by dev/system

import * as http from "node:http";
import * as https from "node:https";
import * as path from "node:path";
import express from "express";
import cors from "cors";
import compression from "compression";
import { Logger } from "../../../myutils/logger.js";
import { classic } from "../../../myutils/node/classic.js";
import { load_server_cert } from "./load_server_cert.js";
const { __dirname } = classic(import.meta.url);

import { handle_rpc_build } from "../build/rpc/handle.js";
import { handle_rpc_watch } from "../watch/rpc/handle.js";

// the name begins with underscore to avoid name conflicts with the imported items
export function _start(plog: Logger, opt: { host: string; http_port: number; https_port: number; setup?: (exp_app: express.Express) => void }) {
    const log = plog.sub("server.start");
    log.variable("opt", opt);
    const exp_app = express();
    exp_app.use(cors());
    exp_app.use(compression());
    exp_app.use(express.static(path.resolve(__dirname, "../_webroot")));
    exp_app.use(
        express.json({
            limit: "100mb"
        })
    );
    // auto display the index page (redirect to)
    exp_app.get("/", (req, res) => {
        res.redirect("/index/");
    });
    // additional setup (if needed)
    if (opt.setup) {
        opt.setup(exp_app);
    }

    exp_app.post("/library/vite/build", (req, res) => {
        const input = req.body;
        const req_log = log.sub("post.library.vite.build");
        handle_rpc_build(req_log, input, {
            invalid_input: (err) => {
                // bad request
                req_log.error(err);
                res.status(400);
                res.end(err.message);
            },
            ok: (result) => {
                // include normal fail case
                req_log.variable("result", result);
                req_log.ok();
                res.json(result);
            },
            fail: (err) => {
                // internal error (not normal fail)
                req_log.error(err);
                res.status(500);
                res.end(err.message);
            }
        });
    });

    exp_app.post("/library/vite/watch", (req, res) => {
        const input = req.body;
        const req_log = log.sub("post.library.vite.watch");
        handle_rpc_watch(req_log, input, {
            invalid_input: (err) => {
                // bad request
                req_log.error(err);
                res.status(400);
                res.end(err.message);
            },
            ok: (result) => {
                // include normal fail case
                req_log.variable("result", result);
                req_log.ok();
                res.json(result);
            },
            fail: (err) => {
                // internal error (not normal fail)
                req_log.error(err);
                res.status(500);
                res.end(err.message);
            }
        });
    });

    // unsafe!
    exp_app.post("/library/:lib_name/:fun_name", (req, res) => {
        const { lib_name, fun_name } = req.params;
        const req_log = log.sub(`post-unsafe.library.${lib_name}.${fun_name}`);
        req_log.variable("params", req.params);
        const input = req.body;
        req_log.variable("input", input);
        import(`../../${lib_name}/${fun_name}/rpc/handle.js`)
            .then((mod) => {
                const fun_code_name = fun_name.replace(/-/g, "_");
                const target_export_fun_name = `handle_rpc_${fun_code_name}`;
                const fun = mod[target_export_fun_name];
                if (typeof fun !== "function") {
                    const err = req_log.new_error(`function is not exported: ${target_export_fun_name}, but got: ${Object.keys(mod)}`);
                    res.status(404);
                    res.end(err.message);
                    return;
                }

                fun(req_log, input, {
                    invalid_input: (err: any) => {
                        // bad request
                        req_log.error(err);
                        res.status(400);
                        res.end(err.message);
                    },
                    ok: (result: any) => {
                        // include normal fail case
                        req_log.variable("result", result);
                        req_log.ok();
                        res.json(result);
                    },
                    fail: (err: any) => {
                        // internal error (not normal fail)
                        req_log.error(err);
                        res.status(500);
                        res.end(err.message);
                    }
                });
            })
            .catch((err) => {
                req_log.error(err);
                res.status(404);
                res.end(`module not found: ${lib_name}/${fun_name}`);
            });
    });

    const http_server = http.createServer(exp_app);
    const https_server = https.createServer(
        {
            SNICallback: (domain, cb) => {
                load_server_cert(log, domain, {
                    ok: (ctx) => {
                        cb(null, ctx);
                    },
                    fail: (err) => {
                        cb(err, null);
                    }
                });
            }
        },
        exp_app
    );

    http_server.on("error", (err) => {
        log.sub("http_server").error(err);
    });

    https_server.on("error", (err) => {
        log.sub("https_server").error(err);
    });

    http_server.listen(opt.http_port, opt.host);
    https_server.listen(opt.https_port, opt.host);

    log.println(`http://${opt.host}:${opt.http_port}`);
    log.println(`https://${opt.host}${opt.https_port ? ":" + opt.https_port : ""}`);
}
