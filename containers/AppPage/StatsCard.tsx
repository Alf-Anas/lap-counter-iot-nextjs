import MainCard from "@/components/layout/MainCard";
import { Col, Row, Tag } from "antd";
import { ReactNode, useContext } from "react";
import { AppContext, CAR_NAME, getCarColor } from ".";
import { calculateAverage } from "@/utils";

export const TABS_KEY = {
    LAPS: "LAPS",
    STATS: "STATS",
};

export default function StatsCard() {
    const { activeData } = useContext(AppContext);

    const allItem = Object.values(activeData).flatMap((itemArray) =>
        itemArray.map((item) => item)
    );
    const allTimes = Object.values(activeData).flatMap((itemArray) =>
        itemArray.map((item) => item.time)
    );

    const lowestValue = Math.min(...allTimes);

    function getLapMax() {
        const redCar = allItem.filter((item) => item.car === CAR_NAME.RED);
        const greenCar = allItem.filter((item) => item.car === CAR_NAME.GREEN);
        const blueCar = allItem.filter((item) => item.car === CAR_NAME.BLUE);
        const noneCar = allItem.filter(
            (item) =>
                item.car !== CAR_NAME.RED &&
                item.car !== CAR_NAME.GREEN &&
                item.car !== CAR_NAME.BLUE
        );

        const maxLength = Math.max(
            redCar.length,
            greenCar.length,
            blueCar.length,
            noneCar.length
        );
        const listNum: ReactNode[] = [];

        for (let i = 0; i < maxLength; i++) {
            listNum.push(
                <Tag
                    key={i}
                    className="rounded-none text-sm block text-start h-[22px]"
                >
                    {i}
                </Tag>,
                <Tag
                    key={i + "X"}
                    className="rounded-none text-sm block text-start h-[22px]"
                >
                    -
                </Tag>
            );
        }

        return listNum;
    }

    function getCarStats(carName: string) {
        const listLane: ReactNode[] = [];
        const thisData = allItem
            .filter((item) => item.car === carName)
            .sort((itemA, itemB) => itemA.time - itemB.time);

        const listSpeed: number[] = [];

        thisData.forEach((item, idx) => {
            const diffSecond = (item.time - lowestValue) / 1000;
            const prefDiffSecond =
                idx !== 0 ? (item.time - thisData[idx - 1].time) / 1000 : 0;
            const label = diffSecond.toFixed(3);

            if (idx !== 0) {
                listSpeed.push(prefDiffSecond);
                listLane.push(
                    <Tag
                        key={idx}
                        className="rounded-none text-sm block text-start h-[22px]"
                    >
                        {prefDiffSecond.toFixed(3)} s
                    </Tag>
                );
            }
            listLane.push(
                <Tag
                    key={idx + "X"}
                    color={getCarColor(item.car)}
                    className="rounded-none text-sm block text-end h-[22px]"
                >
                    {label}
                </Tag>
            );
        });

        if (thisData.length > 1) {
            listLane.push(
                <Tag
                    key="-"
                    className="rounded-none text-sm block text-end h-[22px]"
                >
                    -
                </Tag>,
                <Tag
                    key="avg"
                    className="rounded-none text-sm block text-end h-[22px] font-bold"
                >
                    μ : {calculateAverage(listSpeed).toFixed(3)} s
                </Tag>,
                <Tag
                    key="min"
                    className="rounded-none text-sm block text-end h-[22px] font-bold"
                >
                    Min : {Math.min(...listSpeed).toFixed(3)} s
                </Tag>,
                <Tag
                    key="max"
                    className="rounded-none text-sm block text-end h-[22px] font-bold"
                >
                    Max : {Math.max(...listSpeed).toFixed(3)} s
                </Tag>
            );
        }

        return listLane;
    }

    return (
        <MainCard className="text-center">
            <Row gutter={[0, 0]} className="min-h-[50vh]">
                <Col span={3}>
                    <Tag className="text-base block text-center">LAP</Tag>
                    {getLapMax()}
                </Col>
                <Col span={7}>
                    <Tag
                        color={getCarColor(CAR_NAME.RED)}
                        className="text-base block text-center"
                    >
                        {CAR_NAME.RED}
                    </Tag>
                    {getCarStats(CAR_NAME.RED)}
                </Col>
                <Col span={7}>
                    <Tag
                        color={getCarColor(CAR_NAME.GREEN)}
                        className="text-base block text-center"
                    >
                        {CAR_NAME.GREEN}
                    </Tag>
                    {getCarStats(CAR_NAME.GREEN)}
                </Col>
                <Col span={7}>
                    <Tag
                        color={getCarColor(CAR_NAME.BLUE)}
                        className="text-base block text-center"
                    >
                        {CAR_NAME.BLUE}
                    </Tag>
                    {getCarStats(CAR_NAME.BLUE)}
                </Col>
            </Row>
        </MainCard>
    );
}
