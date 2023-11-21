export type HistoryListType = HistoryType[];

export interface HistoryType {
    id: string;
    created_at: string;
    updated_at: string;
    car_a?: string;
    car_b?: string;
    car_c?: string;
    record: RecordType;
}

export interface RecordType {
    a: TimeDataType[];
    b: TimeDataType[];
    c: TimeDataType[];
}

export interface TimeDataType {
    id: number;
    car: string;
    time: number;
}

export interface CarDataType {
    id: number;
    car: string;
    time: number;
    root_id: string;
    created_at: string;
}
