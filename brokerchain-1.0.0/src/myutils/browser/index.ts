import * as _text from "../common/text.js";
export const text = _text;
import * as _dom from "./dom.js";
export const dom = _dom;
import * as _promise from "../common/promise.js";
export const promise = _promise;
export * from "./environment.js";
export * from "./get_url_search_params.js";
export * from "../common/syntax/index.js";
export * from "../common/delay.js";
export * from "../common/progress.js";
export * from "../common/net/index.js";
export * from "../common/measure.js";
export * from "./rpx.js";
export function clone<T = any>(value: T): T {
    return JSON.parse(JSON.stringify(value));
}
