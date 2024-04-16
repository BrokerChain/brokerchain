import * as crypto from "node:crypto";
import * as fs from "node:fs";
export type HashAlgorithm = "sha1" | "sha256" | "sha512" | "md5"; // TODO
export function hash_data(algorithm: HashAlgorithm, data: Buffer): Buffer {
    const obj = crypto.createHash(algorithm);
    obj.update(data);
    return obj.digest();
}
export function hash_text(algorithm: HashAlgorithm, text: string): string {
    const result = hash_data(algorithm, Buffer.from(text, "utf8"));
    return result.toString("hex");
}
export function hash_file(algorithm: HashAlgorithm, filename: string): string {
    const data = fs.readFileSync(filename);
    const result = hash_data(algorithm, data);
    return result.toString("hex");
}
// console.log(hash_text("sha1", "Hello Jack"));
