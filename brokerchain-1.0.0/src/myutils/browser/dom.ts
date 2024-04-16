import { Logger } from "../logger.js";
import { until } from "../common/delay.js";
import { apply_callback } from "../common/callback.js";
export * from "./dom-utils.js";
export function add_style(text: string) {
    const style = document.createElement("style");
    style.textContent = text;
    document.head.appendChild(style);
    return style;
}
export function add_style_link<R>(
    plog: Logger,
    href: string,
    cb: {
        ok: () => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("add-style-link");
    log.variable("href", href);
    const ele = document.createElement("link");
    ele.rel = "stylesheet";
    ele.href = href;
    document.head.appendChild(ele);
    return new Promise<R>((resolve, reject) => {
        ele.addEventListener("load", () => {
            log.ok();
            apply_callback(() => cb.ok(), resolve, reject);
        });
        ele.addEventListener("error", (e) => {
            log.error(e.error);
            apply_callback(() => cb.fail(e.error || "network failed"), resolve, reject);
        });
    });
}
export function add_script<R>(
    plog: Logger,
    src: string,
    cb: {
        ok: () => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("add-script");
    log.variable("src", src);
    const ele = document.createElement("script");
    ele.src = src;
    document.head.appendChild(ele);
    return new Promise<R>((resolve, reject) => {
        ele.addEventListener("load", () => {
            log.ok();
            apply_callback(() => cb.ok(), resolve, reject);
        });
        ele.addEventListener("error", (e) => {
            log.error(e.error);
            apply_callback(() => cb.fail(e.error || "network failed"), resolve, reject);
        });
    });
}
export function add_div(opt?: {
    id?: string;
    className?: string[];
    attribute?: {
        [key: string]: string;
    };
    cb?: (div: HTMLDivElement) => void;
}) {
    const div = document.createElement("div");
    document.body.appendChild(div);
    if (opt) {
        if (opt.id) {
            div.id = opt.id;
        }
        if (opt.className) {
            div.className = opt.className.join(" ");
        }
        if (opt.attribute) {
            Object.keys(opt.attribute).forEach((name) => {
                const value = opt.attribute[name];
                div.setAttribute(name, value);
            });
        }
        if (opt.cb) {
            opt.cb(div);
        }
    }
    return div;
}
export function add_spider_iframe(url: string, cond: (iframe: HTMLIFrameElement) => boolean) {
    return new Promise<HTMLIFrameElement>((resolve, reject) => {
        add_iframe({
            cb: (iframe) => {
                iframe.src = url;
                iframe.style.position = "fixed";
                iframe.style.left = "10px";
                iframe.style.top = "10px";
                iframe.style.width = "500px";
                iframe.style.height = "500px";
                iframe.style.border = "solid 8px green";
                iframe.style.zIndex = "1000";
                until(() => cond(iframe), 15)
                    .then(() => {
                        resolve(iframe);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        });
    });
}
export function add_iframe(opt?: {
    id?: string;
    className?: string[];
    attribute?: {
        [key: string]: string;
    };
    cb?: (iframe: HTMLIFrameElement) => void;
}) {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    if (opt) {
        if (opt.id) {
            iframe.id = opt.id;
        }
        if (opt.className) {
            iframe.className = opt.className.join(" ");
        }
        if (opt.attribute) {
            Object.keys(opt.attribute).forEach((name) => {
                const value = opt.attribute[name];
                iframe.setAttribute(name, value);
            });
        }
        if (opt.cb) {
            opt.cb(iframe);
        }
    }
    return iframe;
}
export function for_each_from<T extends Element>(root: Element, selector: string, cb: (item: T, i: number) => void) {
    const list = root.querySelectorAll(selector);
    if (list && list.length) {
        list.forEach((item, i) => cb(item as T, i));
    }
}
export function for_each<T extends Element>(selector: string, cb: (item: T, i: number) => void) {
    const list = document.querySelectorAll(selector);
    if (list && list.length) {
        list.forEach((item, i) => cb(item as T, i));
    }
}
export function exists(selector: string): boolean {
    const list = document.querySelectorAll(selector);
    if (list && list.length) {
        return true;
    } else {
        return false;
    }
}
export function ready(cb: () => void) {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        next_tick(cb);
        return;
    }
    document.addEventListener("DOMContentLoaded", () => {
        cb();
    });
}
export function next_tick(cb: () => void) {
    setTimeout(() => {
        cb();
    }, 0);
}
export function set_window_prop(name: string, value: any) {
    const w: any = window;
    w[name] = value;
}
export function text2dom(text: string) {
    const ele = document.createElement("div");
    ele.innerHTML = text;
    return ele;
}
