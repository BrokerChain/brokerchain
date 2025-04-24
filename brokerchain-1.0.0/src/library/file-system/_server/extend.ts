// initialized by dev/system

import { Logger } from "../../../myutils/logger.js";
import express from "express";

// Implement some special features here, for example:
// - upload file
// - download file
export function extend(plog: Logger, exp_app: express.Express, base: string) {
    const log = plog.sub("server.extend");

    // TODO
}
