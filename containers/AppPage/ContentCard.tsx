import { notification } from "antd";
import mqtt, { MqttClient } from "mqtt";
import { useContext, useEffect, useState } from "react";
import LapsCard from "./LapsCard";
import { ActiveDataType, AppContext, CAR_NAME } from ".";
import { TABS_KEY } from "./TopCard";
import StatsCard from "./StatsCard";

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

export default function ContentCard() {
    const [apiNotification, contextHolder] = notification.useNotification();
    const { activeTab, setActiveData, activeLane, refresh } =
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
        }
        if (!activeLane.b) {
            laneCarData = removeCarFromLane(CAR_NAME.GREEN);
        }
        if (!activeLane.c) {
            laneCarData = removeCarFromLane(CAR_NAME.BLUE);
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
    }, [client, activeLane]);

    return (
        <>
            {contextHolder}
            {activeTab === TABS_KEY.LAPS && <LapsCard />}
            {activeTab === TABS_KEY.STATS && <StatsCard />}
        </>
    );
}
