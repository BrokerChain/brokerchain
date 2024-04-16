import { jest } from "@jest/globals";
import { Logger } from "../logger.js";
import { apply_path_parameter } from "./apply_path_parameter.js";
interface Case {
    url: string;
    path_params: {
        [key: string]: string;
    };
    expected_url: string;
}
const case_list: Case[] = [];
case_list.push({
    url: "http://www.target.com/a/b/c?q=1",
    path_params: {},
    expected_url: "http://www.target.com/a/b/c?q=1"
});
case_list.push({
    url: "http://www.target.com/a/b/c?q=1",
    path_params: { a: "x" },
    expected_url: "http://www.target.com/a/b/c?q=1"
});
case_list.push({
    url: "http://www.target.com/:a/b/c?q=1",
    path_params: { a: "x" },
    expected_url: "http://www.target.com/x/b/c?q=1"
});
case_list.push({
    url: "http://www.target.com/:/b/c?q=1",
    path_params: { "": "x" },
    expected_url: "http://www.target.com/x/b/c?q=1"
});
case_list.push({
    url: "http://www.target.com/:a/b/c?q=1",
    path_params: {},
    expected_url: "http://www.target.com//b/c?q=1"
});
case_list.push({
    url: "http://www.target.com/:a/b/c?q=1",
    path_params: { b: "x" },
    expected_url: "http://www.target.com//b/c?q=1"
});
test("simple", () => {
    const log = new Logger("test");
    for (const item of case_list) {
        const result = apply_path_parameter(item.url, item.path_params);
        expect(result).toStrictEqual(item.expected_url);
    }
});
