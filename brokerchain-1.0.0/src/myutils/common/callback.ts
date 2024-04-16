export function apply_callback<R>(exp: () => R, resolve: (v: R) => void, reject: (reason: string) => void) {
    try {
        const ret = exp();
        resolve(ret);
    } catch (err) {
        reject(err.message);
    }
}
