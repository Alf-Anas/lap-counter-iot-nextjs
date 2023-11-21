import MainCard from "@/components/layout/MainCard";
import { Card, Radio, Spin, Typography } from "antd";
import { useContext, useState } from "react";
import { filterDataByLap, momentLocalDate, normalizeRecordData } from "@/utils";
import { HistoryContext } from ".";

const TABS_KEY = {
    LANE: "LANE",
    LAP: "LAP",
    LONG: "LONG",
};

export default function RankCard() {
    const [activeTab, setActiveTab] = useState(TABS_KEY.LAP);
    const { historyList, isLoading } = useContext(HistoryContext);

    const normalizedData = normalizeRecordData(historyList);

    function getBestLane() {
        const listBestSpeed: {
            name: string;
            speed: number;
            id: string;
            created_at: string;
        }[] = [];

        normalizedData.forEach((carData) => {
            if (carData.length === 0) return;

            const thisData = carData.sort(
                (itemA, itemB) => itemA.time - itemB.time
            );
            const listSpeed: number[] = [];

            thisData.forEach((item, idx) => {
                const prefDiffSecond =
                    idx !== 0 ? (item.time - thisData[idx - 1].time) / 1000 : 0;

                if (idx !== 0) {
                    listSpeed.push(prefDiffSecond);
                }
            });

            const minSpeed = Math.min(...listSpeed);
            listBestSpeed.push({
                speed: minSpeed,
                name: thisData[0].car,
                id: thisData[0].root_id,
                created_at: thisData[0].created_at,
            });
        });

        const sortListBestSpeed = listBestSpeed.sort(
            (itemA, itemB) => itemA.speed - itemB.speed
        );

        return (
            <>
                {sortListBestSpeed.map((item, idx) => {
                    return (
                        <Card
                            key={idx}
                            size="small"
                            title={`${idx + 1}. ${
                                item.name
                            } - ${momentLocalDate(item.created_at)}`}
                            extra={<a href={`/history/${item.id}`}>Detail</a>}
                            className="mb-3"
                        >
                            <Typography.Title
                                level={4}
                                className="m-0 text-end"
                            >
                                {item.speed} s
                            </Typography.Title>
                        </Card>
                    );
                })}
            </>
        );
    }

    function getBestLap() {
        const listBestSpeed: {
            name: string;
            speed: number;
            id: string;
            created_at: string;
        }[] = [];

        normalizedData.forEach((carData) => {
            if (carData.length === 0) return;

            const allData = carData.sort(
                (itemA, itemB) => itemA.time - itemB.time
            );

            const thisData = filterDataByLap(allData, 3);
            const listSpeed: number[] = [];

            thisData.forEach((item, idx) => {
                const prefDiffSecond =
                    idx !== 0 ? (item.time - thisData[idx - 1].time) / 1000 : 0;

                if (idx !== 0) {
                    listSpeed.push(prefDiffSecond);
                }
            });

            const minSpeed = Math.min(...listSpeed);
            listBestSpeed.push({
                speed: minSpeed,
                name: thisData[0].car,
                id: thisData[0].root_id,
                created_at: thisData[0].created_at,
            });
        });

        const sortListBestSpeed = listBestSpeed.sort(
            (itemA, itemB) => itemA.speed - itemB.speed
        );

        return (
            <>
                {sortListBestSpeed.map((item, idx) => {
                    return (
                        <Card
                            key={idx}
                            size="small"
                            title={`${idx + 1}. ${
                                item.name
                            } - ${momentLocalDate(item.created_at)}`}
                            extra={<a href={`/history/${item.id}`}>Detail</a>}
                            className="mb-3"
                        >
                            <Typography.Title
                                level={4}
                                className="m-0 text-end"
                            >
                                {item.speed} s
                            </Typography.Title>
                        </Card>
                    );
                })}
            </>
        );
    }

    function getBestLong() {
        const listBestLong: {
            name: string;
            total: number;
            id: string;
            created_at: string;
        }[] = [];

        normalizedData.forEach((carData) => {
            if (carData.length === 0) return;

            listBestLong.push({
                total: carData.length,
                name: carData[0].car,
                id: carData[0].root_id,
                created_at: carData[0].created_at,
            });
        });

        const sortListBestLong = listBestLong.sort(
            (itemA, itemB) => itemB.total - itemA.total
        );

        return (
            <>
                {sortListBestLong.map((item, idx) => {
                    return (
                        <Card
                            key={idx}
                            size="small"
                            title={`${idx + 1}. ${
                                item.name
                            } - ${momentLocalDate(item.created_at)}`}
                            extra={<a href={`/history/${item.id}`}>Detail</a>}
                            className="mb-3"
                        >
                            <Typography.Title
                                level={4}
                                className="m-0 text-end"
                            >
                                {item.total} Lane / {Math.round(item.total / 3)}{" "}
                                Lap
                            </Typography.Title>
                        </Card>
                    );
                })}
            </>
        );
    }

    return (
        <>
            <MainCard className="!p-2 !m-0 !mb-3">
                <Radio.Group
                    buttonStyle="outline"
                    size="large"
                    className="w-full text-center"
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                >
                    <Radio.Button value={TABS_KEY.LAP} className="w-1/3">
                        Lap
                    </Radio.Button>
                    <Radio.Button value={TABS_KEY.LANE} className="w-1/3">
                        Lane
                    </Radio.Button>
                    <Radio.Button value={TABS_KEY.LONG} className="w-1/3">
                        Long
                    </Radio.Button>
                </Radio.Group>
            </MainCard>

            {isLoading && (
                <Spin size="large" className="w-full text-center m-2" />
            )}

            {activeTab === TABS_KEY.LAP && <div>{getBestLap()}</div>}
            {activeTab === TABS_KEY.LANE && <div>{getBestLane()}</div>}
            {activeTab === TABS_KEY.LONG && <div>{getBestLong()}</div>}
        </>
    );
}
