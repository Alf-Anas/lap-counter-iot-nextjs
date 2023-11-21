import MainCard from "@/components/layout/MainCard";
import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Switch,
    Typography,
    message,
} from "antd";
import { useContext, useState } from "react";
import { AppContext } from ".";
import { postHistory } from "@/utils/api";
import BasicModal from "@/components/modal/BasicModal";
import { useRouter } from "next/navigation";
import { CAR_NAME } from "@/utils";

export default function BottomCard() {
    const { activeLane, setActiveLane, activeData } = useContext(AppContext);
    const [carName, setCarName] = useState({ a: "", b: "", c: "" });
    const router = useRouter();

    async function onSaveResults() {
        const res = await postHistory({
            car_a: carName.a,
            car_b: carName.b,
            car_c: carName.c,
            record: activeData,
        });
        if (res.ok) {
            message.success(res.message);
            router.push("/history");
        } else {
            message.error(res.message);
        }
    }

    function getListCar() {
        const allItem = Object.values(activeData).flatMap((itemArray) =>
            itemArray.map((item) => item)
        );

        const redCar = allItem.filter((item) => item.car === CAR_NAME.RED);
        const greenCar = allItem.filter((item) => item.car === CAR_NAME.GREEN);
        const blueCar = allItem.filter((item) => item.car === CAR_NAME.BLUE);

        const noneCar = allItem.filter(
            (item) =>
                item.car !== CAR_NAME.RED &&
                item.car !== CAR_NAME.GREEN &&
                item.car !== CAR_NAME.BLUE
        );

        return { none: noneCar, red: redCar, green: greenCar, blue: blueCar };
    }

    const { none, red, green, blue } = getListCar();

    function showSaveButton() {
        if (red.length < 4 && green.length < 4 && blue.length < 4) {
            return false;
        }

        if (none.length > 0) {
            return false;
        }
        return true;
    }

    return (
        <MainCard className="text-center p-0">
            {showSaveButton() && (
                <BasicModal
                    modalButton={
                        <Button type="primary" className="w-full mb-4">
                            Save Data
                        </Button>
                    }
                    onOk={onSaveResults}
                    title="Save Data"
                    footer={null}
                >
                    {red.length > 0 && (
                        <Form.Item label="Car A">
                            <Input
                                value={carName.a}
                                onChange={(e) =>
                                    setCarName({
                                        ...carName,
                                        a: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    )}
                    {green.length > 0 && (
                        <Form.Item label="Car B">
                            <Input
                                value={carName.b}
                                onChange={(e) =>
                                    setCarName({
                                        ...carName,
                                        b: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    )}
                    {blue.length > 0 && (
                        <Form.Item label="Car C">
                            <Input
                                value={carName.c}
                                onChange={(e) =>
                                    setCarName({
                                        ...carName,
                                        c: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    )}
                    <Button
                        type="primary"
                        className="w-full mb-4"
                        onClick={onSaveResults}
                    >
                        Save
                    </Button>
                </BasicModal>
            )}

            <Row gutter={[12, 12]} className="p-2">
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
