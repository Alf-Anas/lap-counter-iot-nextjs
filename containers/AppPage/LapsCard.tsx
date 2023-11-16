import MainCard from "@/components/layout/MainCard";
import { Col, Divider, Row, Tag } from "antd";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { AppContext, getCarColor } from ".";

const MULTIPLY_PIXEL = 30;

export default function LapsCard() {
    const { activeData } = useContext(AppContext);
    const bottomContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeData]);

    const allTimes = Object.values(activeData).flatMap((itemArray) =>
        itemArray.map((item) => item.time)
    );

    const lowestValue = Math.min(...allTimes);

    function getLane(key: "a" | "b" | "c") {
        const listLane: ReactNode[] = [];
        const thisData = [...activeData[key]];

        thisData.forEach((item, idx) => {
            const diffSecond = (item.time - lowestValue) / 1000;
            const prefDiffSecond =
                idx !== 0 ? (thisData[idx - 1].time - lowestValue) / 1000 : 0;
            const label = diffSecond.toFixed(3);
            const eMargin =
                idx === 0
                    ? diffSecond * MULTIPLY_PIXEL
                    : (diffSecond - prefDiffSecond) * MULTIPLY_PIXEL;

            listLane.push(
                <Tag
                    key={idx}
                    color={getCarColor(item.car)}
                    className="rounded-none text-sm block text-center h-[22px]"
                    style={{ marginTop: eMargin - 22 + "px" }}
                >
                    {label}
                </Tag>
            );
        });

        return listLane;
    }

    return (
        <MainCard className="text-start">
            <Divider className="!m-0 !p-0 !mb-[30px]">Start</Divider>
            <Row gutter={[0, 0]} className="min-h-[50vh]">
                <Col span={8} className="text-center">
                    {getLane("a")}
                </Col>
                <Col span={8} className="text-center">
                    {getLane("b")}
                </Col>
                <Col span={8} className="text-center">
                    {getLane("c")}
                </Col>
            </Row>
            <div ref={bottomContainerRef}>
                <Divider className="!m-0 !p-0">End</Divider>
            </div>
        </MainCard>
    );
}
