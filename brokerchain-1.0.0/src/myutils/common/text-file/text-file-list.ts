import { Logger } from "../../logger.js";
import { TextFile } from "./text-file.js";
import { TextFileMaker } from "./text-file-maker.js";

export class TextFileList {
    list: TextFileMaker[] = [];
    map_by_name: Map<string, TextFileMaker[]>; // multiple item with same name is ok
    map_by_id: Map<string, TextFileMaker[]>; // multiple item with same id is ok
    constructor(list: TextFile[]) {
        this.list = TextFileMaker.from_list(list);
        this.map_by_name = new Map();
        this.map_by_id = new Map();

        for (const item of list) {
            if (!this.map_by_name.has(item.name)) {
                this.map_by_name.set(item.name, [TextFileMaker.from(item)]);
            } else {
                const list = this.map_by_name.get(item.name) || [];
                list.push(TextFileMaker.from(item));
                this.map_by_name.set(item.name, list);
            }

            if (item.id !== undefined) {
                if (!this.map_by_id.has(item.id)) {
                    this.map_by_id.set(item.id, [TextFileMaker.from(item)]);
                } else {
                    const list = this.map_by_id.get(item.id) || [];
                    list.push(TextFileMaker.from(item));
                    this.map_by_id.set(item.id, list);
                }
            }
        }
    }
    raw_list() {
        return this.list.map((item) => item.target);
    }
    get_by_name<R>(
        plog: Logger,
        opts: { name: string },
        cb: {
            none: () => R;
            single: (item: TextFileMaker) => R;
            multiple: (list: TextFileMaker[]) => R;
        }
    ): R {
        const log = plog.sub("get_by_name");
        const { name } = opts;
        log.variable("name", name);
        const list = this.map_by_name.get(name);
        log.variable("list.length", list.length);
        if (list.length === 0) {
            return cb.none();
        } else if (list.length === 1) {
            return cb.single(list[0]);
        } else {
            return cb.multiple(list);
        }
    }
    get_by_name_pattern<R>(
        plog: Logger,
        opts: { pattern: RegExp },
        cb: {
            none: () => R;
            single: (item: TextFileMaker) => R;
            multiple: (list: TextFileMaker[]) => R;
        }
    ): R {
        const log = plog.sub("get_by_name_pattern");
        const { pattern } = opts;
        log.variable("pattern", pattern.toString());
        const list = this.list.filter((item) => pattern.test(item.target.name));
        log.variable("list.length", list.length);
        if (list.length === 0) {
            return cb.none();
        } else if (list.length === 1) {
            return cb.single(list[0]);
        } else {
            return cb.multiple(list);
        }
    }
    must_get_one_by_name_pattern<R>(
        plog: Logger,
        opts: { pattern: RegExp },
        cb: {
            ok: (item: TextFileMaker) => R;
            fail: (err: Error) => R;
        }
    ): R {
        const log = plog.sub("must_get_one_by_name_pattern");
        return this.get_by_name_pattern(log, opts, {
            none: () => {
                this.show_debug_info(log);
                return cb.fail(log.new_error("none"));
            },
            single: (item: TextFileMaker) => {
                return cb.ok(item);
            },
            multiple: (list: TextFileMaker[]) => {
                this.show_debug_info(log);
                return cb.fail(log.new_error("multiple items found"));
            }
        });
    }
    get_by_id<R>(
        plog: Logger,
        opts: {
            id: string;
        },
        cb: {
            none: () => R;
            single: (item: TextFileMaker) => R;
            multiple: (list: TextFileMaker[]) => R;
        }
    ): R {
        const log = plog.sub("get_by_id");
        const { id } = opts;
        log.variable("id", id);
        const list = this.map_by_id.get(id);
        log.variable("list.length", list.length);
        if (list.length === 0) {
            return cb.none();
        } else if (list.length === 1) {
            return cb.single(list[0]);
        } else {
            return cb.multiple(list);
        }
    }
    must_get_one_by_id<R>(
        plog: Logger,
        opts: {
            id: string;
        },
        cb: {
            ok: (item: TextFileMaker) => R;
            fail: (err: Error) => R;
        }
    ): R {
        const log = plog.sub("must_get_one_by_id");
        return this.get_by_id(log, opts, {
            none: () => {
                this.show_debug_info(log);
                return cb.fail(log.new_error("none"));
            },
            single: (item: TextFileMaker) => {
                return cb.ok(item);
            },
            multiple: (list: TextFileMaker[]) => {
                this.show_debug_info(log);
                return cb.fail(log.new_error("multiple items found"));
            }
        });
    }
    find<R>(
        plog: Logger,
        opts: {
            match: (item: TextFileMaker) => boolean;
        },
        cb: {
            none: () => R;
            single: (item: TextFileMaker) => R;
            multiple: (list: TextFileMaker[]) => R;
        }
    ): R {
        const log = plog.sub("find");
        const { match } = opts;
        const list = this.list.filter(match);
        log.variable("list.length", list.length);
        if (list.length === 0) {
            return cb.none();
        } else if (list.length === 1) {
            return cb.single(list[0]);
        } else {
            return cb.multiple(list);
        }
    }

    private show_debug_info(log: Logger) {
        log.variable(
            "list",
            this.list.map((item) => item.target.name)
        );
    }
}
