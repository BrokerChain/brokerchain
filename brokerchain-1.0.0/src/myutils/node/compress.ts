import * as zlib from "node:zlib";
export function decompress_body(contentEncoding: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
        contentEncoding = contentEncoding || "";
        switch (contentEncoding) {
            case "":
                resolve(body);
                break;
            case "gzip":
                zlib.gunzip(body, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
                break;
            // support more formats here
            default:
                reject(new Error("TODO not implemented yet"));
                break;
        }
    });
}
