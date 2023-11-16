import { ObjectLiteral } from "@/types/object-literal.type";

export function safeArray<T = ObjectLiteral>(arr: any, defaultValue = []) {
    if (Array.isArray(arr) && arr.length > 0) {
        return arr as T[];
    }
    return defaultValue as T[];
}

export function safeObject<T = ObjectLiteral>(obj: any, defaultValue = {}) {
    if (!!obj && typeof obj === "object") {
        return obj as T;
    }
    return defaultValue as T;
}

export function safeString(str: any, defaultValue = "", stringify = false) {
    if (!!str && typeof str === "string") {
        return str;
    } else if (typeof str === "number") {
        return String(str);
    } else if (stringify && typeof str === "object") {
        return JSON.stringify(str);
    }
    return defaultValue;
}

export function safeNumber(num: any, defaultValue = 0) {
    if (typeof num === "number") {
        return num;
    }
    return defaultValue;
}

export function getValObject(obj: any, key = "", defaultValue: any = "") {
    if (!!obj && typeof obj === "object") {
        const splitKey = key.split(".");
        let value: any = obj;
        for (let i = 0; i < splitKey.length; i++) {
            value = safeObject(value)[splitKey[i]];
        }
        return value || defaultValue;
    }
    return defaultValue;
}

function splitArray(array: any[], chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

function transposeArray(array: any[][]) {
    return array[0].map((_col, i) => array.map((row) => row[i]));
}

export function generateRowGrid(arrayData: any[], row: number, col: number) {
    const listSplit = splitArray(arrayData, row);

    const transposedArray = transposeArray(listSplit);

    const flattenedArray = transposedArray.flat();

    return flattenedArray;
}
