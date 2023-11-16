import MainCard from "@/components/layout/MainCard";
import { Col, Row, Switch, Typography } from "antd";
import { useContext } from "react";
import { AppContext } from ".";

export default function BottomCard() {
    const { activeLane, setActiveLane } = useContext(AppContext);

    return (
        <MainCard className="text-center p-2">
            <Row gutter={[12, 12]}>
                <Col span={8}>
                    <Switch
                        className={`${activeLane.a ? "!bg-red-500" : ""}`}
                        checked={activeLane.a}
                        onChange={(check) =>
                            setActiveLane({ ...activeLane, a: check })
                        }
                    />
                    <Typography.Title level={3} className="!m-0">
                        A
                    </Typography.Title>
                </Col>
                <Col span={8}>
                    <Switch
                        className={`${activeLane.b ? "!bg-green-500" : ""}`}
                        checked={activeLane.b}
                        onChange={(check) =>
                            setActiveLane({ ...activeLane, b: check })
                        }
                    />
                    <Typography.Title level={3} className="!m-0">
                        B
                    </Typography.Title>
                </Col>
                <Col span={8}>
                    <Switch
                        className={`${activeLane.c ? "!bg-blue-500" : ""}`}
                        checked={activeLane.c}
                        onChange={(check) =>
                            setActiveLane({ ...activeLane, c: check })
                        }
                    />
                    <Typography.Title level={3} className="!m-0">
                        C
                    </Typography.Title>
                </Col>
            </Row>
        </MainCard>
    );
}
