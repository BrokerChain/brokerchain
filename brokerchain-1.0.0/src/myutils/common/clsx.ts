import { twMerge } from "tailwind-merge";

export function clsx(...items: string[]) {
    const value = items.filter((item) => (item ? true : false)).join(" ");
    return twMerge(value);
}
