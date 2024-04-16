export function make_proxy<T>(cb: (method: string, args: any[]) => Promise<any>): T {
    const base = {};
    const proxy = new Proxy(base, {
        get: (target: any, prop_name, receiver) => {
            const value = target[prop_name];
            if (value !== undefined) {
                return value;
            }
            if (typeof prop_name !== "string") {
                return undefined;
            }
            return function (...args: any[]) {
                return cb(prop_name, args);
            };
        }
    });
    return proxy as T;
}
