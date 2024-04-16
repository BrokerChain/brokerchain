export interface MapEx<K, V> {
    get<R>(
        key: K,
        cb: {
            ok: (value: V) => R;
            not_found: () => R;
        }
    ): R;
    fetch(
        key: K,
        cb: {
            default: () => V;
        }
    ): any;
    set<R>(
        key: K,
        value: V,
        cb: {
            add: (value: V) => R;
            replace: (old_value: V, new_value: V) => R;
        }
    ): R;
    to_list<R>(cb: (key: K, value: V) => R): R[];
    length: () => number;
}
export function create_map<K, V>(): MapEx<K, V> {
    const map = new Map<K, V>();
    return {
        get: make_get(map),
        fetch: make_fetch(map),
        set: make_set(map),
        to_list: make_to_list(map),
        length: make_length(map)
    };
}
function make_get<K, V>(map: Map<K, V>) {
    return function <R>(
        key: K,
        cb: {
            ok: (value: V) => R;
            not_found: () => R;
        }
    ): R {
        if (!map.has(key)) {
            return cb.not_found();
        }
        const v = map.get(key);
        return cb.ok(v);
    };
}
function make_fetch<K, V>(map: Map<K, V>) {
    return function (
        key: K,
        cb: {
            default: () => V;
        }
    ): V {
        if (!map.has(key)) {
            const v = cb.default();
            map.set(key, v);
            return v;
        } else {
            const v = map.get(key);
            return v;
        }
    };
}
function make_set<K, V>(map: Map<K, V>) {
    return function <R>(
        key: K,
        value: V,
        cb: {
            add: (value: V) => R;
            replace: (old_value: V, new_value: V) => R;
        }
    ): R {
        if (map.has(key)) {
            const old = map.get(key);
            map.set(key, value);
            return cb.replace(old, value);
        } else {
            map.set(key, value);
            return cb.add(value);
        }
    };
}
function make_to_list<K, V>(map: Map<K, V>) {
    return function <R>(cb: (key: K, value: V) => R): R[] {
        const list: R[] = [];
        for (let [key, value] of map.entries()) {
            list.push(cb(key, value));
        }
        return list;
    };
}
function make_length<K, V>(map: Map<K, V>) {
    return function (): number {
        return map.size;
    };
}
