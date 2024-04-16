interface Collection {
    namespace: string;
    key: string;
    metadata: {};
    items: {
        id: string;
        [key: string]: any;
    }[];
}

export const cache_obj: {
    [key: string]: {
        [key: string]: Collection;
    };
} = {};
