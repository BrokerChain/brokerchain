// auto generated by dev/system

import { Logger } from "../../../myutils/logger.js";

export interface Input {
    sort?: {
        field_list: {
            id?: { order: "ascending" | "descending" };
            fake?: { order: "ascending" | "descending" };
            create_time?: { order: "ascending" | "descending" };
            update_time?: { order: "ascending" | "descending" };
            address?: { order: "ascending" | "descending" };
            port?: { order: "ascending" | "descending" };
        }[];
    };
    page?: { offset: number; limit: number };
}

export interface OutputEmpty {
    list: { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number }[];
    total_count: number;
}

export interface OutputOk {
    list: { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number }[];
    total_count: number;
}

export interface OutputFail {}

export interface Callback<R> {
    empty: (output: OutputEmpty) => R;
    ok: (output: OutputOk) => R;
    fail: (err: Error) => R;
}

export function check_input<R>(plog: Logger, v: any, cb: { ok: () => R; fail: (err: Error) => R }): R {
    const log = plog.sub("check_input");
    log.variable("v", v);
    try {
        log.println("v must be object");
        if (typeof v !== "object" || v === null) {
            throw new Error("v is not object");
        }

        Object.keys(v).forEach((field) => {
            if (field === "sort") return;
            if (field === "page") return;
            throw new Error("v contains unknown field: " + field);
        });

        if (v.sort !== undefined) {
            log.println("v.sort must be object");
            if (typeof v.sort !== "object" || v.sort === null) {
                throw new Error("v.sort is not object");
            }

            Object.keys(v.sort).forEach((field) => {
                if (field === "field_list") return;
                throw new Error("v.sort contains unknown field: " + field);
            });

            log.println("v.sort.field_list must be array");
            if (!Array.isArray(v.sort.field_list)) {
                throw new Error("v.sort.field_list is not array");
            }

            v.sort.field_list.forEach((item: any, i: number) => {
                log.println("check v.sort.field_list[i]");

                log.println("item must be object");
                if (typeof item !== "object" || item === null) {
                    throw new Error("item is not object");
                }

                Object.keys(item).forEach((field) => {
                    if (field === "id") return;
                    if (field === "fake") return;
                    if (field === "create_time") return;
                    if (field === "update_time") return;
                    if (field === "address") return;
                    if (field === "port") return;
                    throw new Error("item contains unknown field: " + field);
                });

                if (item.id !== undefined) {
                    log.println("item.id must be object");
                    if (typeof item.id !== "object" || item.id === null) {
                        throw new Error("item.id is not object");
                    }

                    Object.keys(item.id).forEach((field) => {
                        if (field === "order") return;
                        throw new Error("item.id contains unknown field: " + field);
                    });

                    log.println("item.id.order must be string");
                    if (typeof item.id.order !== "string") {
                        throw new Error("item.id.order is not string");
                    }

                    if (new Set(["ascending", "descending"]).has(item.id.order) === false) {
                        throw new Error("item.id.order is not a valid string enum value");
                    }
                }

                if (item.fake !== undefined) {
                    log.println("item.fake must be object");
                    if (typeof item.fake !== "object" || item.fake === null) {
                        throw new Error("item.fake is not object");
                    }

                    Object.keys(item.fake).forEach((field) => {
                        if (field === "order") return;
                        throw new Error("item.fake contains unknown field: " + field);
                    });

                    log.println("item.fake.order must be string");
                    if (typeof item.fake.order !== "string") {
                        throw new Error("item.fake.order is not string");
                    }

                    if (new Set(["ascending", "descending"]).has(item.fake.order) === false) {
                        throw new Error("item.fake.order is not a valid string enum value");
                    }
                }

                if (item.create_time !== undefined) {
                    log.println("item.create_time must be object");
                    if (typeof item.create_time !== "object" || item.create_time === null) {
                        throw new Error("item.create_time is not object");
                    }

                    Object.keys(item.create_time).forEach((field) => {
                        if (field === "order") return;
                        throw new Error("item.create_time contains unknown field: " + field);
                    });

                    log.println("item.create_time.order must be string");
                    if (typeof item.create_time.order !== "string") {
                        throw new Error("item.create_time.order is not string");
                    }

                    if (new Set(["ascending", "descending"]).has(item.create_time.order) === false) {
                        throw new Error("item.create_time.order is not a valid string enum value");
                    }
                }

                if (item.update_time !== undefined) {
                    log.println("item.update_time must be object");
                    if (typeof item.update_time !== "object" || item.update_time === null) {
                        throw new Error("item.update_time is not object");
                    }

                    Object.keys(item.update_time).forEach((field) => {
                        if (field === "order") return;
                        throw new Error("item.update_time contains unknown field: " + field);
                    });

                    log.println("item.update_time.order must be string");
                    if (typeof item.update_time.order !== "string") {
                        throw new Error("item.update_time.order is not string");
                    }

                    if (new Set(["ascending", "descending"]).has(item.update_time.order) === false) {
                        throw new Error("item.update_time.order is not a valid string enum value");
                    }
                }

                if (item.address !== undefined) {
                    log.println("item.address must be object");
                    if (typeof item.address !== "object" || item.address === null) {
                        throw new Error("item.address is not object");
                    }

                    Object.keys(item.address).forEach((field) => {
                        if (field === "order") return;
                        throw new Error("item.address contains unknown field: " + field);
                    });

                    log.println("item.address.order must be string");
                    if (typeof item.address.order !== "string") {
                        throw new Error("item.address.order is not string");
                    }

                    if (new Set(["ascending", "descending"]).has(item.address.order) === false) {
                        throw new Error("item.address.order is not a valid string enum value");
                    }
                }

                if (item.port !== undefined) {
                    log.println("item.port must be object");
                    if (typeof item.port !== "object" || item.port === null) {
                        throw new Error("item.port is not object");
                    }

                    Object.keys(item.port).forEach((field) => {
                        if (field === "order") return;
                        throw new Error("item.port contains unknown field: " + field);
                    });

                    log.println("item.port.order must be string");
                    if (typeof item.port.order !== "string") {
                        throw new Error("item.port.order is not string");
                    }

                    if (new Set(["ascending", "descending"]).has(item.port.order) === false) {
                        throw new Error("item.port.order is not a valid string enum value");
                    }
                }
            });
        }

        if (v.page !== undefined) {
            log.println("v.page must be object");
            if (typeof v.page !== "object" || v.page === null) {
                throw new Error("v.page is not object");
            }

            Object.keys(v.page).forEach((field) => {
                if (field === "offset") return;
                if (field === "limit") return;
                throw new Error("v.page contains unknown field: " + field);
            });

            log.println("v.page.offset must be number");
            if (typeof v.page.offset !== "number") {
                throw new Error("v.page.offset is not number");
            }

            if (Number.isSafeInteger(v.page.offset) === false) {
                throw new Error("v.page.offset is not safe integer");
            }

            if ((v.page.offset >= 0 && v.page.offset < 9007199254740991) === false) {
                throw new Error("v.page.offset is out of range");
            }

            log.println("v.page.limit must be number");
            if (typeof v.page.limit !== "number") {
                throw new Error("v.page.limit is not number");
            }

            if (Number.isSafeInteger(v.page.limit) === false) {
                throw new Error("v.page.limit is not safe integer");
            }

            if ((v.page.limit >= 0 && v.page.limit < 9007199254740991) === false) {
                throw new Error("v.page.limit is out of range");
            }
        }
    } catch (err) {
        log.error(err);
        return cb.fail(err);
    }
    // nothing wrong
    log.ok();
    return cb.ok();
}

// JSON stringify value before copy to handle some specific problem
// eg. Date Object probelm
export function copy_output_empty(v: any): OutputEmpty {
    if (v !== undefined) {
        const v_cloned = JSON.parse(JSON.stringify(v));
        return _copy_output_empty(v_cloned);
    } else {
        return _copy_output_empty(v);
    }
}

export function _copy_output_empty(v: any): OutputEmpty {
    if (typeof v === "object" && v !== null) {
        const obj = {
            list: copy_list(v.list),
            total_count: copy_total_count(v.total_count)
        };
        return obj;
    } else {
        return { list: [], total_count: 0 };
    }

    function copy_list(v: any): { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number }[] {
        return Array.isArray(v) ? v.map(copy_item) : [];

        function copy_item(v: any): { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number } {
            if (typeof v === "object" && v !== null) {
                const obj = {
                    id: copy_id(v.id),
                    fake: v.fake !== undefined && v.fake !== null ? copy_fake(v.fake) : undefined,
                    create_time: copy_create_time(v.create_time),
                    update_time: copy_update_time(v.update_time),
                    address: copy_address(v.address),
                    port: copy_port(v.port)
                };
                return obj;
            } else {
                return { id: "", create_time: "", update_time: "", address: "", port: 0 };
            }

            function copy_id(v: any): string {
                return typeof v === "string" ? v : "";
            }

            function copy_fake(v: any): boolean {
                return typeof v === "boolean" ? v : false;
            }

            function copy_create_time(v: any): string {
                // empty datetime value is acceptable
                if (typeof v !== "string") {
                    return "";
                } else {
                    if (v === "") {
                        return v;
                    } else if (Number.isNaN(Date.parse(v)) === false) {
                        return v;
                    } else {
                        // invalid value, return empty string
                        return "";
                    }
                }
            }

            function copy_update_time(v: any): string {
                // empty datetime value is acceptable
                if (typeof v !== "string") {
                    return "";
                } else {
                    if (v === "") {
                        return v;
                    } else if (Number.isNaN(Date.parse(v)) === false) {
                        return v;
                    } else {
                        // invalid value, return empty string
                        return "";
                    }
                }
            }

            function copy_address(v: any): string {
                return typeof v === "string" ? v : "";
            }

            function copy_port(v: any): number {
                return typeof v === "number" ? v : 0;
            }
        }
    }

    function copy_total_count(v: any): number {
        return typeof v === "number" ? v : 0;
    }
}

// JSON stringify value before copy to handle some specific problem
// eg. Date Object probelm
export function copy_output_ok(v: any): OutputOk {
    if (v !== undefined) {
        const v_cloned = JSON.parse(JSON.stringify(v));
        return _copy_output_ok(v_cloned);
    } else {
        return _copy_output_ok(v);
    }
}

export function _copy_output_ok(v: any): OutputOk {
    if (typeof v === "object" && v !== null) {
        const obj = {
            list: copy_list(v.list),
            total_count: copy_total_count(v.total_count)
        };
        return obj;
    } else {
        return { list: [], total_count: 0 };
    }

    function copy_list(v: any): { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number }[] {
        return Array.isArray(v) ? v.map(copy_item) : [];

        function copy_item(v: any): { id: string; fake?: boolean; create_time: string; update_time: string; address: string; port: number } {
            if (typeof v === "object" && v !== null) {
                const obj = {
                    id: copy_id(v.id),
                    fake: v.fake !== undefined && v.fake !== null ? copy_fake(v.fake) : undefined,
                    create_time: copy_create_time(v.create_time),
                    update_time: copy_update_time(v.update_time),
                    address: copy_address(v.address),
                    port: copy_port(v.port)
                };
                return obj;
            } else {
                return { id: "", create_time: "", update_time: "", address: "", port: 0 };
            }

            function copy_id(v: any): string {
                return typeof v === "string" ? v : "";
            }

            function copy_fake(v: any): boolean {
                return typeof v === "boolean" ? v : false;
            }

            function copy_create_time(v: any): string {
                // empty datetime value is acceptable
                if (typeof v !== "string") {
                    return "";
                } else {
                    if (v === "") {
                        return v;
                    } else if (Number.isNaN(Date.parse(v)) === false) {
                        return v;
                    } else {
                        // invalid value, return empty string
                        return "";
                    }
                }
            }

            function copy_update_time(v: any): string {
                // empty datetime value is acceptable
                if (typeof v !== "string") {
                    return "";
                } else {
                    if (v === "") {
                        return v;
                    } else if (Number.isNaN(Date.parse(v)) === false) {
                        return v;
                    } else {
                        // invalid value, return empty string
                        return "";
                    }
                }
            }

            function copy_address(v: any): string {
                return typeof v === "string" ? v : "";
            }

            function copy_port(v: any): number {
                return typeof v === "number" ? v : 0;
            }
        }
    }

    function copy_total_count(v: any): number {
        return typeof v === "number" ? v : 0;
    }
}

// backward compatible purpose
export type Output = OutputOk;
export const copy_output = copy_output_ok;
