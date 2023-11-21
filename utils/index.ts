import {
    CarDataType,
    HistoryListType,
    HistoryType,
    TimeDataType,
} from "@/types/history.interface";
import { ObjectLiteral } from "@/types/object-literal.type";
import moment from "moment";

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

export function calculateAverage(numbers: number[]) {
    return numbers.length
        ? numbers.reduce((total, num) => total + num, 0) / numbers.length
        : 0;
}

export function filterDataByLap<T>(data: T[], step = 3): T[] {
    return data.filter((_, index) => index % step === 0);
}

export function momentLocalDate(isoDate: string) {
    const eDate = moment(isoDate).format("DD-MM-YYYY HH:mm:ss");

    return eDate;
}

const updateCarNames = (
    data: CarDataType[],
    history: HistoryType
): CarDataType[] => {
    return data.map((item) => {
        switch (item.car) {
            case "RED":
                return {
                    ...item,
                    car: history.car_a || "RED",
                    root_id: history.id,
                    created_at: history.created_at,
                };
            case "GREEN":
                return {
                    ...item,
                    car: history.car_b || "GREEN",
                    root_id: history.id,
                    created_at: history.created_at,
                };
            case "BLUE":
                return {
                    ...item,
                    car: history.car_c || "BLUE",
                    root_id: history.id,
                    created_at: history.created_at,
                };
            default:
                return {
                    ...item,
                    root_id: history.id,
                    created_at: history.created_at,
                };
        }
    });
};

const splitDataByCarName = (data: CarDataType[]): CarDataType[][] => {
    const groupedData: Record<string, CarDataType[]> = {};

    data.forEach((item) => {
        const carName = item.car;
        if (!groupedData[carName]) {
            groupedData[carName] = [];
        }
        groupedData[carName].push(item);
    });

    return Object.values(groupedData);
};

export function normalizeRecordData(historyList: HistoryListType) {
    const eList: CarDataType[][] = [];
    historyList.forEach((history) => {
        const allItem = Object.values(history.record).flatMap((itemArray) =>
            itemArray.map((item: TimeDataType) => item)
        );
        const newNames = updateCarNames(allItem, history);
        const splitByCar = splitDataByCarName(newNames);
        eList.push(...splitByCar);
    });

    return eList;
}

export const CAR_NAME = {
    RED: "RED",
    GREEN: "GREEN",
    BLUE: "BLUE",
    YELLOW: "YELLOW",
};

export function getCarColor(car: string) {
    switch (car) {
        case CAR_NAME.RED:
            return "red";
        case CAR_NAME.GREEN:
            return "green";
        case CAR_NAME.BLUE:
            return "blue";
        default:
            return "yellow";
    }
}
