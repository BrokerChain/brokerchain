import { twMerge } from "tailwind-merge";

export function clsx(...items: (string | undefined | null)[]) {
    const value = items.filter((item) => (item ? true : false)).join(" ");
    return twMerge(value);
}
