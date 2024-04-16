import { jest } from "@jest/globals";
import { Logger } from "../logger.js";
import * as dir from "./dir/index.js";
import { run_bash_script } from "./run_bash_script.js";
const _log = new Logger("test");
test("fail for not existing file", (done) => {
    const log = _log.sub_next();
    run_bash_script(
        log.sub_next(),
        {
            filename: "notexists"
        },
        {
            code_ok: ({ code }) => {
                throw new Error("unexpected");
            },
            code_not_ok: ({ code }) => {
                expect(code !== 0).toBe(true);
                done();
            },
            fail: (err) => {
                throw new Error("unexpected");
            }
        }
    );
});
test("ok.sh", (done) => {
    const log = _log.sub_next();
    run_bash_script(
        log.sub_next(),
        {
            filename: dir.asset_run_bash_script_ok
        },
        {
            code_ok: ({ stdout, stderr, code }) => {
                expect(stdout).toStrictEqual("ok\n");
                expect(stderr).toStrictEqual("");
                expect(code === 0).toBe(true);
                done();
            },
            code_not_ok: ({ code }) => {
                throw new Error("unexpected");
            },
            fail: (err) => {
                throw new Error("unexpected");
            }
        }
    );
});
test("fail.sh", (done) => {
    const log = _log.sub_next();
    run_bash_script(
        log.sub_next(),
        {
            filename: dir.asset_run_bash_script_fail
        },
        {
            code_ok: () => {
                throw new Error("unexpected");
            },
            code_not_ok: ({ stdout, stderr, code }) => {
                expect(stdout).toStrictEqual("");
                expect(stderr).toStrictEqual("fail\n");
                expect(code === 99).toBe(true);
                done();
            },
            fail: (err) => {
                throw new Error("unexpected");
            }
        }
    );
});
//// this test is hard to auto run
//// we have to uncomment it and test it manually :(
// test("detached.sh", (done) => {
//     const log = _log.sub_next();
//     // deteched script will kill current process,
//     // we will never receive any return value!!!
//     // but you will heard something (on macOS only)
//     run_bash_script(
//         log.sub_next(),
//         {
//             filename: dir.dev_run_bash_script_detached,
//             detached: true
//         },
//         {
//             code_ok: ({ stdout, stderr, code }) => {
//                 throw new Error("unexpected");
//             },
//             code_not_ok: ({ code }) => {
//                 throw new Error("unexpected");
//             },
//             fail: (err) => {
//                 throw new Error("unexpected");
//             }
//         }
//     );
// });
