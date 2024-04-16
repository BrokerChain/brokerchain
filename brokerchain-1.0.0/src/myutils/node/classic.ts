// this module is useful when you need some old-school node.js common js global stuffs

import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

export function classic(url: string) {
    const require = createRequire(url);
    const __filename = fileURLToPath(url);
    const __dirname = path.dirname(__filename);
    return { require, __filename, __dirname };
}
