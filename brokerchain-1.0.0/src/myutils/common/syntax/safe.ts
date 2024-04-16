export function safe<T = any>(exp: () => T): T | undefined {
    try {
        return exp();
    } catch (err) {
        // ignore
        return undefined;
    }
}
