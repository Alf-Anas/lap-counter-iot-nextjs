import MainCard from "@/components/layout/MainCard";
import { Button, Typography } from "antd";
import mqtt, { MqttClient } from "mqtt";
import { useEffect, useState } from "react";

const TOPIC = {
    A: "/geoit.dev/lap-counter/a",
    B: "/geoit.dev/lap-counter/b",
    C: "/geoit.dev/lap-counter/c",
};

export default function AboutCard() {
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
            client.subscribe(TOPIC.A, (err) => {
                console.log(TOPIC.A);
            });
            client.subscribe(TOPIC.B, (err) => {
                console.log(TOPIC.B);
            });
            client.subscribe(TOPIC.C, (err) => {
                console.log(TOPIC.C);
            });
        });

        client.on("message", (topic, message) => {
            console.log(
                `Received message on topic ${topic}: ${message.toString()}`
            );
        });

        client.on("error", (error) => {
            console.error(`Error: ${error}`);
        });
    }, [client]);

    function onPublish() {
        // console.log("Publish");
        // client?.publish(TOPIC, "Hello AAAAAA!");
    }

    return (
        <MainCard className="text-start">
            <Typography.Title level={2} className="mt-0">
                About Me
            </Typography.Title>
            <Button type="primary" onClick={onPublish}>
                Publish
            </Button>
        </MainCard>
    );
}
