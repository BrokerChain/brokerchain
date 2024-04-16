import { jest } from "@jest/globals";
import * as fs from "node:fs";
import * as dir from "./index.js";
test("check paths", () => {
    // this code seems to be long (not so clean)
    // cause this style makes it easier to find out which one fails
    console.log(dir);
    expect(fs.existsSync(dir.ikev2)).toStrictEqual(true);
    expect(fs.existsSync(dir.ikev2_freeradius)).toStrictEqual(true);
    expect(fs.existsSync(dir.ikev2_freeradius_authorize)).toStrictEqual(true);
    expect(fs.existsSync(dir.ikev2_strongswan)).toStrictEqual(true);
    expect(fs.existsSync(dir.ikev2_strongswan_secrets)).toStrictEqual(true);
});
