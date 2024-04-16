export class AsyncQueue<T = any> {
    list: T[];
    doing: boolean;
    action: (item: T, done: () => void) => void;
    constructor(action: (item: T, done: () => void) => void) {
        this.action = action;
        this.list = [];
        this.doing = false;
    }
    push(item: T) {
        this.list.push(item);
        this.fireAction();
    }
    fireAction() {
        if (!this.action) return;
        if (this.doing) return;
        if (!this.list.length) return;
        this.doing = true;
        const item = this.list[0];
        this.action(item, () => {
            this.list.shift();
            this.doing = false;
            this.fireAction();
        });
    }
}
