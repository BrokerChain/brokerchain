import { Logger } from "../../logger.js";
import { list_dir } from "./list_dir.js";
list_dir(
    new Logger("test"),
    {
        dir: "/"
    },
    {
        empty: async () => {
            console.log("empty");
        },
        ok: async (items) => {
            console.log(items);
        },
        fail: async (err) => {
            console.error(err);
        }
    }
);
