export function groupByColumns<T = any>(list: T[], columns: number) {
    return {
        getColumnLength,
        getRowLength,
        at,
        forEachCell,
        forEachRow
    };
    function getColumnLength() {
        return columns;
    }
    function getRowLength() {
        return Math.ceil(list.length / columns);
    }
    function at(rowIndex: number, columnIndex: number): T | undefined {
        const index = rowIndex * columns + columnIndex;
        return list[index];
    }
    function indexOf(rowIndex: number, columnIndex: number) {
        return rowIndex * columns + columnIndex;
    }
    function forEachCell(
        cb: (
            element: T | undefined,
            pos: {
                rowIndex: number;
                columnIndex: number;
                index: number;
            }
        ) => void
    ) {
        const rowLength = getRowLength();
        for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
            for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
                const index = indexOf(rowIndex, columnIndex);
                cb(at(rowIndex, columnIndex), {
                    rowIndex,
                    columnIndex,
                    index
                });
            }
        }
    }
    function forEachRow(cb: (list: (T | undefined)[], rowIndex: number) => void) {
        const rowLength = getRowLength();
        for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
            let list: (T | undefined)[] = [];
            for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
                const index = indexOf(rowIndex, columnIndex);
                const ele = at(rowIndex, columnIndex);
                list.push(ele);
            }
            cb(list, rowIndex);
        }
    }
}
export class Group<T = any> {
    columns: number;
    list: T[];
    constructor(columns: number) {
        if (!Number.isSafeInteger(columns) || columns < 0) {
            throw new Error("Invalid Columns Value: " + columns);
        }
        this.columns = columns;
    }
    add(value: T) {
        this.list.push(value);
    }
}
