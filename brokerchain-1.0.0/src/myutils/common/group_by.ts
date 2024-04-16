import { MapEx, create_map } from "./map.js";
export function group_by<T>(list: T[], cb: (item: T, add_to_group: (key: string) => void) => void): MapEx<string, T[]> {
    const map = create_map<string, T[]>();
    list.forEach((item) => {
        cb(item, (key: string) => {
            const list: T[] = map.fetch(key, {
                default: () => []
            });
            list.push(item);
        });
    });
    return map;
}
