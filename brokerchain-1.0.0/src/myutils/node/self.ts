import * as dir from "./dir/index.js";
import * as fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const p = require(dir.resolve(dir.root, "package.json"));
export const _package = p;
export const version = p.version;
export const id = process.env["id"] || fs.readFileSync(dir.env_id, "utf8").trim();
if (!id) {
    console.error("environment variable 'id'?");
    process.exit(1);
}
