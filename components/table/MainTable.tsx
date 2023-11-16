import { Table, Input, Row, Col } from "antd";
import { ReactNode, useEffect, useState } from "react";
import moment from "moment";
import { safeArray } from "@/utils";
import { ObjectLiteral } from "@/types/object-literal.type";

export const SORTING_TYPE = {
    number: "NUMBER",
    text: "TEXT",
    date: "DATE",
    date_label: "DATE_LABEL",
};

export const NUMBER_COLUMN = {
    title: "No",
    dataIndex: "index",
    key: "index",
    sorting: SORTING_TYPE.number,
};

function customColumn(column: ObjectLiteral[]) {
    const mCol: ObjectLiteral[] = [];
    column.forEach((item) => {
        switch (item.sorting) {
            case SORTING_TYPE.number:
                item.sorter = (a: ObjectLiteral, b: ObjectLiteral) =>
                    Number(a[item.key]) - Number(b[item.key]);
                break;
            case SORTING_TYPE.text:
                item.sorter = (a: ObjectLiteral, b: ObjectLiteral) =>
                    String(a[item.key]).localeCompare(String(b[item.key]));
                break;
            case SORTING_TYPE.date:
                item.sorter = (a: ObjectLiteral, b: ObjectLiteral) => {
                    const alfa = moment(String(a[item.key]), "DD-MM-YYYY");
                    const beta = moment(String(b[item.key]), "DD-MM-YYYY");
                    return alfa.diff(beta);
                };
                break;
            case SORTING_TYPE.date_label:
                item.sorter = (a: ObjectLiteral, b: ObjectLiteral) => {
                    const alfa = moment(String(a[item.key]), "DD MMM YYYY");
                    const beta = moment(String(b[item.key]), "DD MMM YYYY");
                    return alfa.diff(beta);
                };
                break;
            default:
        }
        mCol.push(item);
    });
    return mCol;
}

function globalSearch(
    searchTxt: string,
    columns: ObjectLiteral[],
    dataSource: ObjectLiteral[]
) {
    const filteredList = dataSource.filter((item) => {
        const search = searchTxt.toLowerCase();
        let flag = false;
        columns.forEach((col) => {
            if (
                String(item[col.dataIndex]).toLowerCase().indexOf(search) > -1
            ) {
                flag = true;
                return;
            }
        });
        if (flag) return item;
    });
    return filteredList;
}

function addIndex(dataSource: ObjectLiteral[]) {
    const mData = dataSource.map((item, idx) => ({
        ...item,
        key: idx,
        index: item.index ? item.index : idx + 1,
    }));
    return mData;
}

type Props = {
    columns: ObjectLiteral[];
    search?: boolean;
    actionMenu?: ReactNode;
    size?: "small" | "middle" | "large";
    dataSource: ObjectLiteral[];
    loading?: boolean;
};

export default function MainTable({
    columns = [],
    search: showSearch = true,
    actionMenu,
    size = "middle",
    dataSource: inputDataSource = [],
    loading: loadingState = false,
}: Props) {
    const [allData, setAllData] = useState<ObjectLiteral[]>([]);
    const [shownData, setShownData] = useState<ObjectLiteral[]>([]);

    useEffect(() => {
        const mInput = addIndex(safeArray(inputDataSource));
        setShownData(mInput);
        setAllData(mInput);
    }, [inputDataSource]);

    function onSearchData(txt: string) {
        const mSearch = globalSearch(txt, columns, allData);
        setShownData(mSearch);
    }

    return (
        <>
            <Row>
                {showSearch && (
                    <Col>
                        <Input.Search
                            allowClear
                            onSearch={(txt) => onSearchData(txt)}
                            placeholder="Search..."
                            onChange={(e) => onSearchData(e.target.value)}
                        />
                    </Col>
                )}

                {actionMenu && (
                    <Col flex="auto">
                        <div className="float-right">{actionMenu}</div>
                    </Col>
                )}
            </Row>

            <Table
                size={size}
                style={{ overflowX: "auto" }}
                bordered
                loading={loadingState}
                dataSource={shownData}
                columns={customColumn(columns)}
                pagination={{
                    position: ["bottomRight"],
                    defaultPageSize: 25,
                }}
            />
        </>
    );
}
