import { TextFile } from "./text-file.js";

export class TextFileMaker {
    static from(target: TextFile): TextFileMaker {
        const item = new TextFileMaker("");
        item.target = target;
        return item;
    }

    static from_list(target_list: TextFile[]): TextFileMaker[] {
        return target_list.map((target) => {
            const item = new TextFileMaker("");
            item.target = target;
            return item;
        });
    }

    target: TextFile = {
        name: "",
        content: "",
        do_not_override: false
    };
    constructor(name: string) {
        this.target.name = name;
    }
    id(v: string) {
        this.target.id = v;
        return this;
    }
    name(v: string) {
        this.target.name = v;
        return this;
    }
    content(...args: string[]) {
        const text = args.join("\n");
        this.target.content = text;
        return this;
    }
    do_not_override(v: boolean) {
        this.target.do_not_override = v;
        return this;
    }
}
