import { Logger } from "../../logger.js";

export async function stream_to_buffer<R>(
    plog: Logger,
    stream: NodeJS.ReadableStream,
    cb: {
        ok: (data: Buffer) => R;
        fail: (err: Error) => R;
    }
): Promise<R> {
    const log = plog.sub("stream_to_buffer");
    try {
        const chunk_list: Buffer[] = [];
        for await (const chunk of stream) {
            // log.variable("chunk", chunk);
            chunk_list.push(Buffer.from(chunk)); // the chunk can be string of Buffer
        }
        const data = Buffer.concat(chunk_list);
        // log.variable("data", data.toString("hex"));
        return cb.ok(data);
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
}
