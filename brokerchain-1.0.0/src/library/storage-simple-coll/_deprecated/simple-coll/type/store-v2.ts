import { IdItem } from "./id-item.js";
export interface StoreV2 {
    version: number;
    items: Collection<any>[];
}
export interface Collection<T extends IdItem> {
    namespace: string;
    key: string;
    metadata: {
        [key: string]: any;
    };
    items: T[];
}
