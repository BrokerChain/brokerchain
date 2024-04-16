export interface Checker {
    string: typeof checkString;
    nonEmptyString: typeof checkStringNotEmpty;
    emailString: typeof checkEmailString;
    object: typeof checkObject;
    array: typeof checkArray;
    notUndefined: typeof checkNotUndefined;
}
export const checker: Checker = {
    string: checkString,
    nonEmptyString: checkStringNotEmpty,
    emailString: checkEmailString,
    object: checkObject,
    array: checkArray,
    notUndefined: checkNotUndefined
};
function checkEmailString(v: any): boolean {
    if (typeof v !== "string") {
        return false;
    }
    if (v.length === 0) {
        return false;
    }
    const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailPattern.test(v);
}
function checkString(v: any): boolean {
    if (typeof v !== "string") {
        return false;
    }
    return true;
}
function checkStringNotEmpty(v: any): boolean {
    if (typeof v !== "string") {
        return false;
    }
    if (v.length === 0) {
        return false;
    }
    return true;
}
function checkNotUndefined(v: any): boolean {
    return v !== undefined;
}
function checkObject(
    v: any,
    checkField?: {
        [key: string]: (v: any) => boolean;
    }
): boolean {
    if (typeof v !== "object" || v === null) {
        return false;
    }
    if (checkField) {
        let result = true;
        Object.keys(v).forEach((fieldName) => {
            const fieldValue = v[fieldName];
            if (!checkField[fieldName]) {
                result = false;
            }
            if (!checkField[fieldName](fieldValue)) {
                result = false;
            }
        });
        return result;
    } else {
        return true;
    }
}
function checkArray(v: any, checkItem?: (i: number, v: any) => boolean): boolean {
    if (!Array.isArray(v)) {
        return false;
    }
    if (checkItem) {
        let result = true;
        for (let i = 0; i < v.length; ++i) {
            const item = v[i];
            if (!checkItem(i, item)) {
                result = false;
                break;
            }
        }
        return result;
    } else {
        return true;
    }
}
