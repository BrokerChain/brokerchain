// initialized by dev/system

import { script } from "../../../myutils/common/html/index.js";

const id = "";

export function analytics() {
    if (!id) {
        return [];
    }

    return [
        script().src(`https://www.googletagmanager.com/gtag/js?id=${id}`).attr({
            async: "true"
        }),
        script(
            `window.dataLayer = window.dataLayer || [];`,
            `function gtag(){dataLayer.push(arguments);}`,
            `gtag('js', new Date());`,
            `gtag('config', '${id}');`
        )
    ];
}
