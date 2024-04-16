import { Logger } from "../../logger.js";
// import { ws_service, WsService } from "../ws-service/index.js";
// import { make_client_ws } from "../../common/rpc";
// import * as web_server_config from "../../../web-server/config";
// import { make_client as make_core_client } from "../../../x-project/core/web-api/wss/core/client.js";
import { guid } from "../../common/guid.js";
import { sleep } from "../../common/delay.js";
export function auto_reload_page() {
    const log = new Logger("auto_reload_page");
    // disable auto reload in prod environment
    if (localStorage.getItem("dev") === "true") {
        log.enable(false);
        // run(log);
        throw new Error("TODO");
    }
}
// async function run(log: Logger) {
//     const protocol = location.protocol === "https" ? "wss" : "ws";
//     const io = await ws_service(log, `${protocol}://${location.host}/`, {
//         open: async () => {
//             const name = `auto_reload_page.client.${guid()}`;
//             const core_client = make_core_client(name, io);
//             const { last_stamp } = await core_client.watch_web_root_change(log, {});
//             // watch change
//             while (true) {
//                 const res = await core_client.watch_web_root_change(log, {});
//                 if (res.last_stamp !== last_stamp) {
//                     log.println("page changed, auto reload...");
//                     location.reload();
//                 }
//                 await sleep(1);
//             }
//         },
//         service: async (plog, name, input) => {
//             // ignore
//             throw new Error("todo");
//         },
//         close: () => {
//             // ignore
//         },
//         error: () => {
//             // ignore
//         },
//         reconnect: () => {
//             // ingore
//         }
//     });
// }
