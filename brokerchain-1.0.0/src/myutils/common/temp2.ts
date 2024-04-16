export function cypher(data: Buffer, key: number) {
    // console.log('encode ' + msg.length)
    for (var i = 0; i < data.length; ++i) {
        data[i] ^= key;
    }
    return data;
}
export function decypher(data: Buffer, key: number) {
    // console.log('decode ' + msg.length)
    for (var i = 0; i < data.length; ++i) {
        data[i] ^= key;
    }
    return data;
}
