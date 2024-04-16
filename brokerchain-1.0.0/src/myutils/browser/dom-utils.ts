export function enum_forms() {
    var list = [];
    for (var i = 0; i < document.forms.length; ++i) {
        list.push(form_of(document.forms[i]));
    }
    return list;
    function form_of(form: any) {
        return {
            id: form.id,
            input_list: to_list(form.querySelectorAll("input")),
            select_list: to_list(form.querySelectorAll("select"))
        };
    }
}
export function to_list(x: any) {
    return ([] as any).__proto__.slice.apply(x, []);
}
// 每隔一段时间执行 loop_cb，如此循环，直到 loop_cb 返回结果
// 然后便调用 then
// #then(err, result)
export function until(loop_cb: any, then: any) {
    then = then || function () {};
    var result = loop_cb();
    if (result) {
        then(null, result);
    } else {
        setTimeout(function () {
            until(loop_cb, then);
        }, 250);
    }
}
export function delay_as_opt(opt: any, cb: any) {
    if (opt.delay > 0) {
        setTimeout(function () {
            cb();
        }, opt.delay);
    } else {
        cb();
    }
}
export function delay_as_opt_promise(opt: any) {
    return new Promise<void>((resolve, reject) => {
        if (opt.delay > 0) {
            setTimeout(function () {
                resolve();
            }, opt.delay);
        } else {
            resolve();
        }
    });
}
export function delay_cb(cb: any, delay?: any) {
    cb = cb || function () {};
    if (delay === undefined) {
        delay = 100;
    }
    return function () {
        setTimeout(cb, delay);
    };
}
export function inject_script(script: string) {
    var s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.textContent = script;
    document.head.appendChild(s);
}
export function open_new(url: string) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    setTimeout(function () {
        a.click();
    }, 0);
}
export function qall<T extends HTMLElement>(selector: string, context?: T): T[] {
    if (!selector) return [];
    const nodes = context ? context.querySelectorAll<T>(selector) : document.querySelectorAll<T>(selector);
    const list: T[] = [];
    for (var i = 0; i < nodes.length; ++i) {
        list.push(nodes[i]);
    }
    return list;
}
export function click_element(target: any) {
    if (!target) return;
    if (typeof target === "string") {
        target = document.querySelectorAll(target);
        if (!target || target.length === 0) return;
    }
    if (Array.isArray(target)) {
        target.forEach(trigger_click);
    } else if (target.length) {
        for (var i = 0; i < target.length; ++i) {
            trigger_click(target[i]);
        }
    } else {
        trigger_click(target);
    }
}
function trigger_input(target: any, value: string) {
    const InputEvent = (window as any).InputEvent;
    trigger_click(target);
    set_native_value(target, "");
    for (let c of value) {
        // const key = "Key" + c.toUpperCase();
        // const code = c.charCodeAt(0).toString();
        // target.dispatchEvent(
        //     new KeyboardEvent("keydown", {
        //         key,
        //         code
        //     })
        // );
        // target.dispatchEvent(
        //     new KeyboardEvent("keypress", {
        //         key,
        //         code
        //     })
        // );
        // textInput
        // target.value += c
        set_native_value(target, target.value + c);
        target.dispatchEvent(
            new InputEvent("input", {
                data: c,
                inputType: "insertText",
                bubbles: true,
                composed: true
            })
        );
        // target.dispatchEvent(
        //     new KeyboardEvent("keyup", {
        //         key,
        //         code
        //     })
        // );
    }
    // generate 'change' event
    target.dispatchEvent(new Event("change"));
}
function trigger_click(target: any) {
    if (!target) return;
    const dispatch = (event: string) => {
        const evt = new MouseEvent(event, {
            // button?: number;
            // buttons?: number;
            // clientX?: number;
            // clientY?: number;
            // movementX?: number;
            // movementY?: number;
            // relatedTarget?: EventTarget | null;
            // screenX?: number;
            // screenY?: number;
        });
        target.dispatchEvent(evt);
    };
    target.focus();
    dispatch("mousedown");
    trigger_focus(target);
    dispatch("mouseup");
    // dispatch('click');
    target.click();
}
function trigger_focus(target: any) {
    if (!target) return;
    const evt = new FocusEvent("focus");
    target.dispatchEvent(evt);
}
function trigger_blur(target: any) {
    if (!target) return;
    const evt = new FocusEvent("blur");
    target.dispatchEvent(evt);
}
function set_native_value(element: any, value: string) {
    const getValuePropDesc = (target: any) => {
        const p = Object.getOwnPropertyDescriptor(target, "value");
        return p && p.set ? p.set : null;
    };
    const valueSetter = getValuePropDesc(element);
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = getValuePropDesc(prototype);
    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else if (valueSetter) {
        valueSetter.call(element, value);
    } else {
        throw new Error("The given element does not have a value setter");
    }
}
export async function wait_timeout(m: number) {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, m);
    });
}
export function safe<T = any>(exp: () => T): T | undefined {
    try {
        return exp();
    } catch (err) {
        console.warn(err);
        return undefined;
    }
}
export async function until_cond(msg: string, cond: () => boolean, interval = 500, maxRetry = 10): Promise<boolean> {
    let count = 0;
    while (count < maxRetry) {
        ++count;
        let ret = cond();
        if (ret) {
            console.log(`[${count}] HIT! ${msg}`);
            return ret;
        } else {
            console.log(`[${count}] ${msg}`);
            await wait_timeout(interval);
        }
    }
    throw new Error("unti_cond() never meet");
}
export function exists(selector: string): boolean {
    return document.querySelector(selector) !== null;
}
export async function sleep(sec: number) {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, Math.max(sec * 1000, 0));
    });
}
export async function wait_for_multi(targets: { [key: string]: () => Promise<any> }) {
    const items = Object.keys(targets).map((key) => ({
        selector: key,
        callback: targets[key]
    }));
    while (true) {
        for (let item of items) {
            const e = document.querySelector(item.selector);
            if (e) {
                console.log(`[wait_for_multi] hit selector: ${item.selector}`);
                return await item.callback();
            } else {
                console.log(`[wait_for_multi] miss selector: ${item.selector}`);
            }
        }
        console.log("[wait_for_multi] sleep");
        await sleep(0.5);
    }
}
export async function wait_for<T extends Element>(selector: string, nth?: number): Promise<T> {
    nth = nth || 0;
    while (true) {
        console.log("wait for: " + selector);
        const list = document.querySelectorAll<T>(selector);
        if (list && list.length && list[nth]) {
            console.log("wait ok for: " + selector);
            return list[nth];
        } else {
            console.log("wait sleep for: " + selector);
            await sleep(0.1);
        }
    }
}
export async function wait_for_all<T extends HTMLElement>(selector: string): Promise<T[]> {
    while (true) {
        console.log("wait for: " + selector);
        const list = qall<T>(selector);
        if (list && list.length) {
            console.log("wait ok for: " + selector);
            return list;
        } else {
            console.log("wait sleep for: " + selector);
            await sleep(0.1);
        }
    }
}
export async function wait_click(
    selector: string,
    opt?: {
        delay?: number;
        nth?: number;
    }
) {
    let nth = 0;
    if (opt && opt.nth) {
        nth = opt.nth;
    }
    const target = await wait_for(selector, nth);
    target.scrollIntoView();
    if (opt && opt.delay) {
        await sleep(opt.delay);
    }
    click_element(target);
}
export async function wait_click_element(
    target: HTMLElement,
    opt?: {
        delay?: number;
    }
) {
    target.scrollIntoView();
    if (opt && opt.delay) {
        await sleep(opt.delay);
    }
    click_element(target);
}
export async function wait_input(
    selector: string,
    value: string,
    opt?: {
        delay?: number;
    }
) {
    const target = await wait_for<HTMLInputElement>(selector);
    target.scrollIntoView();
    if (opt && opt.delay) {
        await sleep(opt.delay);
    }
    await _input(target, value);
}
// export async function focusInput(target: HTMLInputElement) {
//     target.focus();
//     await sleep(1.25);
// }
// export async function blurInput(target: HTMLInputElement) {
//     target.blur();
//     await sleep(1.25);
// }
// export async function keydownInput(target: HTMLInputElement, key: string) {
//     target.dispatchEvent(
//         new KeyboardEvent('keydown', {
//             key,
//         })
//     );
//     await sleep(1.25);
// }
// export async function inputInput(target: HTMLInputElement, text: string) {
//     // for (const ch of text) {
//     //     target.dispatchEvent(new (window as any).InputEvent('input', { data: ch, inputType: 'insertText' }));
//     // }
//     target.value = text;
//     target.dispatchEvent(
//         new Event('change', {
//             bubbles: true,
//             cancelable: false,
//         })
//     );
//     await sleep(1.25);
// }
async function _input(target: HTMLInputElement, value: string) {
    await trigger_input(target, value);
}
export async function input(selector: string, value: string) {
    const inputList = document.querySelectorAll<HTMLInputElement>(selector);
    if (!inputList || inputList.length < 1) {
        console.log("input not found: " + selector);
        return false;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < inputList.length; ++i) {
        const item = inputList[i];
        await _input(item, value);
    }
    console.log(`input ok, selector=${selector}, value=${value}`);
    return true;
}
// function clickButton(selector: string) {
//     const bt: HTMLDivElement | null = document.querySelector(selector);
//     if (bt) {
//         // tslint:disable-next-line:no-console
//         console.log('click ' + selector);
//         bt.click();
//     } else {
//         // tslint:disable-next-line:no-console
//         console.log('click not found: ' + selector);
//     }
// }
export function clear_white_space(v: string) {
    if (!v) return v;
    return v.replace(/\s/g, "");
}
// FIX ME
// this module is imported by some node module
// which cause window object is not defined crash...
// this dirty if statement exists for fixing this
if (typeof window !== "undefined") {
    const w: any = window;
    w.test = {
        trigger_input
    };
}
