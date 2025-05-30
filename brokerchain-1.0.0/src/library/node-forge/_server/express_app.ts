// auto generated by dev/system
import express from "express";
import cors from "cors";
import compression from "compression";
import { Logger } from "../../../myutils/logger.js";

export function express_app(plog: Logger) {
    const log = plog.sub("server.express_app");
    const exp_app = express();
    exp_app.use(cors());
    exp_app.use(compression());
    exp_app.use(
        express.json({
            limit: "100mb"
        })
    );
    return exp_app;
}
