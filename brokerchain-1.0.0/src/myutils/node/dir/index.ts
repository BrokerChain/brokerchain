import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const root = path.resolve(__dirname, "../../../../");
export const src = path.resolve(root, "src");
export const dist = path.resolve(root, "dist");
export const dist_web_root = path.resolve(dist, "web-root"); // [important] web-app bundle output directory
export const asset = path.resolve(root, "asset");
export const env_root = path.resolve(root, "../../");
export const upgrade_script = path.resolve(env_root, "upgrade.sh");
export const download = path.resolve(env_root, "download");
export const web_root = path.resolve(root, "web-root");
export const web_root_lib = path.resolve(root, "web-root-lib");
export const web_root_temp = path.resolve(web_root, "temp");
export const env_web_root = path.resolve(env_root, "web-root");
export const src_library = path.resolve(src, "library");
export const dist_library = path.resolve(dist, "library");
export const src_meta_library = path.resolve(src, "meta-library");
export const dist_meta_library = path.resolve(dist, "meta-library");
export const src_meta_system = path.resolve(src, "meta-system");
export const dist_meta_system = path.resolve(dist, "meta-system");
export const src_project = path.resolve(src, "x-project");
export const dist_project = path.resolve(dist, "x-project");
export function meta_library(name: string) {
    const meta_library_src = path.resolve(src, "meta-library");
    const meta_library_dist = path.resolve(dist, "meta-library");
    return {
        src: path.resolve(meta_library_src, name),
        src_index: path.resolve(meta_library_src, name, "index.ts"),
        dist: path.resolve(meta_library_dist, name),
        dist_index: path.resolve(meta_library_dist, name, "index.js")
    };
}
export function library(name: string) {
    const library_src = path.resolve(src, "library");
    const library_dist = path.resolve(dist, "library");
    return {
        src: path.resolve(library_src, name),
        dist: path.resolve(library_dist, name)
    };
}
export function system(name: string) {
    const meta_system_src = path.resolve(src, "meta-system");
    const meta_system_dist = path.resolve(dist, "meta-system");
    const root_src = path.resolve(src_project, name);
    const root_dist = path.resolve(dist_project, name);
    return {
        src: {
            root: root_src,
            system: path.resolve(meta_system_src, name),
            store: path.resolve(root_src, "store"),
            web_api: path.resolve(root_src, "web-api/json/server"),
            web_api_tool: path.resolve(root_src, "web-api/json/server/_")
        },
        dist: {
            root: root_dist,
            system: path.resolve(meta_system_dist, name),
            store: path.resolve(root_dist, "store"),
            web_api: path.resolve(root_dist, "web-api/json/server"),
            web_api_tool: path.resolve(root_dist, "web-api/json/server/_")
        }
    };
}
export const asset_fixture = path.resolve(asset, "fixture");
export const asset_fixture_flac = path.resolve(asset_fixture, "flac");
export const asset_run_bash_script = path.resolve(asset_fixture, "run_bash_script");
export const asset_run_bash_script_ok = path.resolve(asset_run_bash_script, "ok.sh");
export const asset_run_bash_script_fail = path.resolve(asset_run_bash_script, "fail.sh");
export const asset_run_bash_script_detached = path.resolve(asset_run_bash_script, "detached.sh");
export const web_article = path.resolve(src, "web-article");
export const web_article_core = path.resolve(web_article, "core");
export const web_article_list = path.resolve(web_article, "list");
// it's possible to change the default data dir location using the environment variable 'data-dir'
// a useful feature in server environment for upgrading easily
export const data = process.env["data_dir"] ? path.resolve(process.env["data_dir"]) : path.resolve(env_root, "data");
export const secret = path.resolve(data, "secret");
export const ca = path.resolve(secret, "ca");
export const ca_of_domian = (domain: string) => {
    return {
        // same account private key for different environment
        account: {
            private_key: path.resolve(ca, domain, "account/private.pem")
        },
        certificate: (opts: { service_provicer: string; environment: string }) => {
            const { service_provicer, environment } = opts;
            return {
                private: path.resolve(ca, domain, `${service_provicer}/${environment}/private.pem`),
                fullchain: path.resolve(ca, domain, `${service_provicer}/${environment}/fullchain.pem`)
            };
        },
        cert: path.resolve(ca, domain, "ca.crt"),
        private_key: path.resolve(ca, domain, "ca.key")
    };
};
export const simple_kv = path.resolve(data, "simple-kv");
export const simple_coll = path.resolve(data, "simple-coll");
export const simple_stream = path.resolve(data, "simple-stream");
fs.mkdirSync(simple_stream, { recursive: true });
export const web_file = path.resolve(data, "web-file");
export const temp = path.resolve(data, "temp");
export const temp_lisp = path.resolve(temp, "lisp");
export const cloud = path.resolve(root, "builder/cloud");
export function resolve(...parts: string[]) {
    return path.resolve(...parts);
}
