import { add_script } from "./dom.js";
import { Logger } from "../logger.js";
// FIX mutile fetch?
export async function fetch() {
    const log = new Logger("p5.fetch");
    const p5 = (window as any).p5;
    return new Promise((resolve, reject) => {
        if (p5) {
            resolve(p5);
        } else {
            add_script(log.sub("p5.min.js"), "/hello/lib/p5.min.js", {
                ok: () => {
                    add_script(log.sub("p5.sound.min.js"), "/hello/lib/p5.sound.min.js", {
                        ok: () => {
                            resolve((window as any).p5);
                        },
                        fail: (err) => {
                            reject(err);
                        }
                    });
                },
                fail: (err) => {
                    reject(err);
                }
            });
        }
    });
}
