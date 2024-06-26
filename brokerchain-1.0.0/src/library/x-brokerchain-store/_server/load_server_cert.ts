// auto generated by dev/system

import * as fs from "node:fs";
import * as tls from "node:tls";
import * as path from "node:path";
import { Logger } from "../../../myutils/logger.js";

// [WARN]
// does not work on mac or windows yet
// this module loads cert from let's encrypt default location on linux
// - /etc/letsencrypt/live/{domain}/fullchain.pem
// - /etc/letsencrypt/live/{domain}/private.pem

const cert_cache = new Map<string, tls.SecureContext>();

export function load_server_cert<R>(
    plog: Logger,
    domain: string,
    cb: {
        ok: (ctx: tls.SecureContext) => R;
        fail: (err: Error) => R;
    }
): R {
    const log = plog.sub("load_server_cert");
    log.variable("domain", domain);
    const cert_location = resolve_cert_location(domain);
    log.variable("cert_location", cert_location);
    // certs may fail to load
    try {
        var cert = read(cert_location.public_key);
        var key = read(cert_location.private_key);
        log.variable_secret("cert", cert);
        log.variable_secret("key", key);
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
    // ok
    let target = cert_cache.get(domain);
    if (target) {
        log.println("fetch cert (from cache) for domain: " + domain);
        return cb.ok(target);
    } else {
        // certs may fail to load (not found)
        try {
            target = tls.createSecureContext({
                cert,
                key
            });
            cert_cache.set(domain, target);
            log.println("fetch cert for domain: " + domain);
            return cb.ok(target);
        } catch (err) {
            log.error(err);
            return cb.fail(err);
        }
    }
}

function read(name: string) {
    return fs.readFileSync(name, "utf8");
}

function resolve_cert_location(domain_name: string): {
    public_key: string;
    private_key: string;
} {
    domain_name = domain_name.toLowerCase();
    const cert_base_dir = "/etc/letsencrypt/live"; // use let's encrypt by default
    return {
        public_key: path.resolve(cert_base_dir, domain_name, "fullchain.pem"),
        private_key: path.resolve(cert_base_dir, domain_name, "privkey.pem")
    };
}
