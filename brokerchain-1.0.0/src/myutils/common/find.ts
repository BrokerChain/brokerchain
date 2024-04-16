interface Target<T> {
    item: T;
    index: number;
}
interface Callback<T, R> {
    ok: (result: { current: Target<T>; prev?: Target<T>; next?: Target<T> }) => R;
    not_found: () => R;
}
export function find<T, R>(
    opts: {
        list: T[];
        match: (item: T) => boolean;
    },
    cb: Callback<T, R>
): R {
    const { list, match } = opts;
    const index = list.findIndex(match);
    if (index === -1) {
        return cb.not_found();
    } else {
        const item = list[index];
        const current: Target<T> = {
            item,
            index
        };
        const prev_index = index - 1;
        if (prev_index >= 0) {
            var prev: Target<T> = {
                item: list[prev_index],
                index: prev_index
            };
        }
        const next_index = index + 1;
        if (next_index < list.length) {
            var next: Target<T> = {
                item: list[next_index],
                index: next_index
            };
        }
        return cb.ok({
            current,
            prev,
            next
        });
    }
}
