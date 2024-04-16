// FIXME this implementation is terrible!
export class ZhCounter {
    static list = [
        "\u96F6",
        "\u4E00",
        "\u4E8C",
        "\u4E09",
        "\u56DB",
        "\u4E94",
        "\u516D",
        "\u4E03",
        "\u516B",
        "\u4E5D",
        "\u5341",
        "\u5341\u4E00",
        "\u5341\u4E8C",
        "\u5341\u4E09",
        "\u5341\u56DB",
        "\u5341\u4E94",
        "\u5341\u516D",
        "\u5341\u4E03",
        "\u5341\u516B",
        "\u5341\u4E5D"
    ];
    index: number = 0;
    next() {
        this.index += 1;
        return this;
    }
    name() {
        const list = ZhCounter.list;
        if (this.index > list.length - 1) {
            throw new Error("\u5C1A\u672A\u5B9E\u73B0");
        }
        return list[this.index];
    }
}
