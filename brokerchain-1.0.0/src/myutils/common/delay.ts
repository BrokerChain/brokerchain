export function next_tick() {
    return new Promise((resolve) => {
        requestAnimationFrame(resolve);
    });
}
export function sleep(seconds: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, Math.max(0, seconds * 1000));
    });
}
export function until(cond: () => boolean, maxSeconds: number = Infinity) {
    return new Promise<void>((resolve, reject) => {
        if (maxSeconds === Infinity) {
            _until(cond, resolve);
        } else if (Number.isNaN(maxSeconds) || maxSeconds <= 0) {
            reject();
        } else {
            // support max seconds here
            let ms = Math.max(0, maxSeconds * 1000);
            let resolved = false;
            let rejected = false;
            let handle = setTimeout(() => {
                if (!resolved) {
                    rejected = true;
                    reject(new Error("timeout"));
                }
            }, ms);
            _until(
                () => {
                    if (!rejected) {
                        return cond();
                    } else {
                        return true;
                    }
                },
                () => {
                    if (!rejected) {
                        resolved = true;
                        clearTimeout(handle);
                        resolve();
                    }
                }
            );
        }
    });
}
function _until(cond: () => boolean, cb: () => void) {
    const ok = cond();
    if (ok) {
        cb();
    } else {
        setTimeout(() => {
            _until(cond, cb);
        }, 100);
    }
}
