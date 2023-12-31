import { notification } from "antd";
import mqtt, { MqttClient } from "mqtt";
import { useContext, useEffect, useState } from "react";
import { ActiveDataType, AppContext } from ".";
import { TABS_KEY } from "./TopCard";
import TrackCard from "./TrackCard";
import LaneCard from "./LaneCard";
import LapCard from "./LapCard";
import { CAR_NAME } from "@/utils";

const TOPIC = {
    A: "/geoit.dev/lap-counter/a",
    B: "/geoit.dev/lap-counter/b",
    C: "/geoit.dev/lap-counter/c",
};

let counting = 0;

type LaneCarDataType = {
    a: string[];
    b: string[];
    c: string[];
};

let laneCarData: LaneCarDataType = {
    a: [],
    b: [],
    c: [],
};

function removeCarFromLane(carName: string) {
    const updatedLaneCarData = Object.fromEntries(
        Object.entries(laneCarData).map(([key, values]) => [
            key,
            values.filter((value) => value !== carName),
        ])
    );

    return updatedLaneCarData as LaneCarDataType;
}

function findAndAddCarToLane(carName: string) {
    const redCar = laneCarData.a.find((item) => item === carName);
    const greenCar = laneCarData.b.find((item) => item === carName);
    const blueCar = laneCarData.c.find((item) => item === carName);

    if (!redCar && !greenCar && !blueCar) {
        if (carName === CAR_NAME.RED) {
            laneCarData.a.push(carName);
        } else if (carName === CAR_NAME.GREEN) {
            laneCarData.b.push(carName);
        } else if (carName === CAR_NAME.BLUE) {
            laneCarData.c.push(carName);
        }
    }

    return JSON.parse(JSON.stringify(laneCarData)) as LaneCarDataType;
}

export default function ContentCard() {
    const [apiNotification, contextHolder] = notification.useNotification();
    const { activeTab, setActiveData, activeLane, refresh, activeData } =
        useContext(AppContext);

    const [client, setClient] = useState<MqttClient>();
    useEffect(() => {
        const mClient = mqtt.connect("wss://test.mosquitto.org", {
            port: 8081,
            clientId: Math.random().toString(),
        });

        setClient(mClient);
    }, []);

    useEffect(() => {
        counting = 0;
        laneCarData = {
            a: [],
            b: [],
            c: [],
        };
        if (activeLane.a) {
            laneCarData.a.push(CAR_NAME.RED);
        }
        if (activeLane.b) {
            laneCarData.b.push(CAR_NAME.GREEN);
        }
        if (activeLane.c) {
            laneCarData.c.push(CAR_NAME.BLUE);
        }
    }, [refresh]);

    useEffect(() => {
        if (!activeLane.a) {
            laneCarData = removeCarFromLane(CAR_NAME.RED);
        } else {
            laneCarData = findAndAddCarToLane(CAR_NAME.RED);
        }
        if (!activeLane.b) {
            laneCarData = removeCarFromLane(CAR_NAME.GREEN);
        } else {
            laneCarData = findAndAddCarToLane(CAR_NAME.GREEN);
        }
        if (!activeLane.c) {
            laneCarData = removeCarFromLane(CAR_NAME.BLUE);
        } else {
            laneCarData = findAndAddCarToLane(CAR_NAME.BLUE);
        }
    }, [activeLane]);

    useEffect(() => {
        if (!client) return;
        console.log("CLIENT SETUP");

        client.on("connect", () => {
            console.log("MQTT CONNECTED");
            client.subscribe(TOPIC.A, (_err) => {
                console.log("Subscribing to : " + TOPIC.A);
            });
            client.subscribe(TOPIC.B, (_err) => {
                console.log("Subscribing to : " + TOPIC.B);
            });
            client.subscribe(TOPIC.C, (_err) => {
                console.log("Subscribing to : " + TOPIC.C);
            });
        });

        client.on("error", (error) => {
            apiNotification.error({
                message: "Error",
                description: JSON.stringify(error),
            });
            console.error(`Error: ${error}`);
        });
    }, [client]);

    useEffect(() => {
        if (!client) return;

        const handleReceivedMessage = (topic: string, message: Buffer) => {
            console.log(
                `Received message on topic ${topic}: ${message.toString()}`
            );

            counting++;
            const eTime = message.toString();

            function getCarName(key: "a" | "b" | "c") {
                if (key === "a" && laneCarData.a.length > 0) {
                    const carName = laneCarData.a[0];
                    laneCarData.a.splice(0, 1);
                    laneCarData.b.push(carName);
                    return carName;
                } else if (key === "b" && laneCarData.b.length > 0) {
                    const carName = laneCarData.b[0];
                    laneCarData.b.splice(0, 1);
                    laneCarData.c.push(carName);
                    return carName;
                } else if (key === "c" && laneCarData.c.length > 0) {
                    const carName = laneCarData.c[0];
                    laneCarData.c.splice(0, 1);
                    laneCarData.a.push(carName);
                    return carName;
                }

                return CAR_NAME.YELLOW;
            }

            function getCurrentData(
                key: "a" | "b" | "c",
                oldState: ActiveDataType,
                carName: string
            ) {
                return {
                    ...oldState,
                    [key]: [
                        ...oldState[key],
                        {
                            time: Number(eTime),
                            car: carName,
                            id: counting,
                        },
                    ],
                };
            }

            if (topic === TOPIC.A) {
                const carName = getCarName("a");
                setActiveData((oldState) =>
                    getCurrentData("a", oldState, carName)
                );
            } else if (topic === TOPIC.B) {
                const carName = getCarName("b");
                setActiveData((oldState) =>
                    getCurrentData("b", oldState, carName)
                );
            } else if (topic === TOPIC.C) {
                const carName = getCarName("c");
                setActiveData((oldState) =>
                    getCurrentData("c", oldState, carName)
                );
            }
        };

        client.on("message", handleReceivedMessage);
        return () => {
            client.off("message", handleReceivedMessage);
        };
    }, [client, activeLane, refresh]);

    return (
        <>
            {contextHolder}
            {activeTab === TABS_KEY.TRACK && (
                <TrackCard activeData={activeData} />
            )}
            {activeTab === TABS_KEY.LANE && (
                <LaneCard activeData={activeData} />
            )}
            {activeTab === TABS_KEY.LAP && <LapCard activeData={activeData} />}
        </>
    );
}
