import MainCard from "@/components/layout/MainCard";
import { Button, Tabs, TabsProps, Tag, Typography, notification } from "antd";
import mqtt, { MqttClient } from "mqtt";
import { useContext, useEffect, useState } from "react";
import LapsCard from "./LapsCard";
import {
    ACTIVE_DATA_INITIAL,
    ActiveDataItemType,
    ActiveDataType,
    AppContext,
    CAR_NAME,
} from ".";
import { TABS_KEY } from "./TopCard";
import StatsCard from "./StatsCard";

const TOPIC = {
    A: "/geoit.dev/lap-counter/a",
    B: "/geoit.dev/lap-counter/b",
    C: "/geoit.dev/lap-counter/c",
};

let counting = 0;

export default function ContentCard() {
    const [apiNotification, contextHolder] = notification.useNotification();
    const { activeTab, activeData, setActiveData, activeLane } =
        useContext(AppContext);
    // const [activeData, setActiveData] =
    //     useState<ActiveDataType>(ACTIVE_DATA_INITIAL);

    const [client, setClient] = useState<MqttClient>();
    useEffect(() => {
        const mClient = mqtt.connect("wss://test.mosquitto.org", {
            port: 8081,
            clientId: Math.random().toString(),
        });

        setClient(mClient);
    }, []);

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
            console.log(activeLane);
            counting++;
            const eTime = message.toString();

            function getCarName(
                key: "a" | "b" | "c",
                oldState: ActiveDataType
            ) {
                const itemData = oldState[key];

                if (itemData.length === 0) {
                    if (key === "a" && activeLane.a) {
                        return CAR_NAME.RED;
                    } else if (key === "b" && activeLane.b) {
                        return CAR_NAME.GREEN;
                    } else if (key === "c" && activeLane.c) {
                        return CAR_NAME.BLUE;
                    }
                } else {
                    const lastItem = itemData[itemData.length - 1];
                    const prevCar = lastItem.car;

                    if (prevCar === CAR_NAME.RED && activeLane.c) {
                        return CAR_NAME.BLUE;
                    } else if (prevCar === CAR_NAME.GREEN && activeLane.a) {
                        return CAR_NAME.RED;
                    } else if (prevCar === CAR_NAME.BLUE && activeLane.b) {
                        return CAR_NAME.GREEN;
                    }
                }

                // if(itemData.length % 3 === 0){
                //     if (key === "a" && activeLane.a) {
                //         return CAR_NAME.RED;
                //     } else if (key === "b" && activeLane.b) {
                //         return CAR_NAME.GREEN;
                //     } else if (key === "c" && activeLane.c) {
                //         return CAR_NAME.BLUE;
                //     }
                // }
                // if(itemData.length % 2 === 0){
                //     if (key === "a" && activeLane.a) {
                //         return CAR_NAME.RED;
                //     } else if (key === "b" && activeLane.b) {
                //         return CAR_NAME.GREEN;
                //     } else if (key === "c" && activeLane.c) {
                //         return CAR_NAME.BLUE;
                //     }
                // }

                let prevItemData: ActiveDataItemType[] = [];
                if (key === "a") {
                    prevItemData = oldState.c;
                } else if (key === "b") {
                    prevItemData = oldState.a;
                } else if (key === "c") {
                    prevItemData = oldState.b;
                }

                console.log(key, prevItemData);

                if (prevItemData.length > 0) {
                    const lastItem = prevItemData[prevItemData.length - 1];
                    const activeCar = lastItem.car;

                    if (activeCar === CAR_NAME.RED && activeLane.a) {
                        return CAR_NAME.RED;
                    } else if (activeCar === CAR_NAME.GREEN && activeLane.b) {
                        return CAR_NAME.GREEN;
                    } else if (activeCar === CAR_NAME.BLUE && activeLane.c) {
                        return CAR_NAME.BLUE;
                    }
                }

                return CAR_NAME.YELLOW;
            }

            function getCurrentData(
                key: "a" | "b" | "c",
                oldState: ActiveDataType
            ) {
                return {
                    ...oldState,
                    [key]: [
                        ...oldState[key],
                        {
                            time: Number(eTime),
                            car: getCarName(key, oldState),
                            id: counting,
                        },
                    ],
                };
            }

            if (topic === TOPIC.A) {
                setActiveData((oldState) => getCurrentData("a", oldState));
            } else if (topic === TOPIC.B) {
                setActiveData((oldState) => getCurrentData("b", oldState));
            } else if (topic === TOPIC.C) {
                setActiveData((oldState) => getCurrentData("c", oldState));
            }
            console.log(
                `Received message on topic ${topic}: ${message.toString()}`
            );
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
