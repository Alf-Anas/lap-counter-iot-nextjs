import { Card, Spin } from "antd";
import { useContext } from "react";
import { momentLocalDate } from "@/utils";
import { HistoryContext } from ".";

export default function HistoryCard() {
    const { historyList, isLoading } = useContext(HistoryContext);

    return (
        <>
            {isLoading && (
                <Spin size="large" className="w-full text-center m-2" />
            )}
            {historyList.map((item, idx) => {
                return (
                    <Card
                        key={idx}
                        size="small"
                        title={momentLocalDate(item.created_at)}
                        extra={
                            <a target="_blank" href={`/history/${item.id}`}>
                                Detail
                            </a>
                        }
                        className="mb-3"
                    >
                        {item.car_a && (
                            <p className="m-0 text-red-500">A : {item.car_a}</p>
                        )}
                        {item.car_b && (
                            <p className="m-0 text-green-500">
                                B : {item.car_b}
                            </p>
                        )}
                        {item.car_c && (
                            <p className="m-0 text-blue-500">
                                C : {item.car_c}
                            </p>
                        )}
                    </Card>
                );
            })}
        </>
    );
}
