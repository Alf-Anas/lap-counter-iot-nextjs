import MainCard from "@/components/layout/MainCard";
import MyImage from "@/components/preview/MyImage";
import { UndoOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Radio, Row, Tag, Typography } from "antd";
import { ReactNode, useContext, useEffect } from "react";
import { AppContext, CAR_NAME, getCarColor } from ".";

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
                    {i + 1}
                </Tag>
            );
        }

        return listNum;
    }

    function getCarStats(carName: string) {
        const listLane: ReactNode[] = [];
        const thisData = allItem.filter((item) => item.car === carName);

        thisData.forEach((item, idx) => {
            const diffSecond = (item.time - lowestValue) / 1000;
            const prefDiffSecond =
                idx !== 0 ? (thisData[idx - 1].time - lowestValue) / 1000 : 0;
            const label = diffSecond.toFixed(3);

            listLane.push(
                <Tag
                    key={idx}
                    // color={getCarColor(item.car)}
                    className="rounded-none text-sm block text-end h-[22px]"
                >
                    {label}
                </Tag>
            );
        });

        return listLane;
    }

    return (
        <MainCard className="text-center">
            {/* <ol>
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
            </ol> */}

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
