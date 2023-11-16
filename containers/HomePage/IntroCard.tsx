import MainCard from "@/components/layout/MainCard";
import MyImage from "@/components/preview/MyImage";
import useMQTT from "@/hooks/useMQTT";
import {
    GithubOutlined,
    LinkedinOutlined,
    PushpinOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Tag, Typography } from "antd";

import mqtt, { MqttClient } from "mqtt";
import { useEffect, useRef } from "react";

const client = mqtt.connect("mqtt://test.mosquitto.org", {
    port: 1883,
    clientId: Math.random().toString(),
});

const TOPIC = {
    A: "/geoit.dev/lap-counter/a",
    B: "/geoit.dev/lap-counter/b",
    C: "/geoit.dev/lap-counter/c",
};

client.on("connect", () => {
    console.log("CONNECT");
    client.subscribe("presence", (err) => {
        console.log("presence");
        if (!err) {
            console.log("ERROR");
            client.publish("presence", "Hello mqtt");
        }
    });
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

function bufferToNumericValue(buffer: any) {
    // Ensure the input is a Buffer
    if (!Buffer.isBuffer(buffer)) {
        throw new Error("Input must be a Buffer");
    }

    // Read the numeric value using readUIntBE
    const numericValue = buffer.readUIntBE(0, buffer.length);

    return numericValue;
}

let dataA = ''

client.on("message", (topic, message) => {
    console.log(topic);
    // message is Buffer
    // console.log(message);
    console.log(message.toString());
    // console.log(bufferToNumericValue(message));
    // client.end();
    dataA = message.toString()
});

export default function IntroCard() {
    useEffect(() => {}, []);

    const incommingMessageHandlers = useRef([
        {
            topic: "/geoit.dev/test/001",
            handler: (msg: string) => {
                // addMessage(msg);
                console.log("msg", msg);
            },
        },
    ]);

    const mqttClientRef = useRef<MqttClient | null>(null);
    const setMqttClient = (client: MqttClient) => {
        mqttClientRef.current = client;
    };

    // useMQTT({
    //     uri: "mqtt://test.mosquitto.org",
    //     options: {
    //         port: 1883,
    //     },
    //     topicHandlers: incommingMessageHandlers.current,
    //     onConnectedHandler: (client) => setMqttClient(client),
    // });

    function onClickMQTT() {
        console.log("CLICK");
        console.log(dataA)

        // const client = mqttClientRef.current;
        if (!client) {
            console.log(
                "(publishMessages) Cannot publish, mqttClient: ",
                client
            );
            return;
        }

        client.publish("presence", `${Math.random()} - TEST PUBLISH`);
        client.publish(
            "/geoit.dev/test/001",
            `${Math.random()} - TEST PUBLISH`
        );
    }

    return (
        <Row className="my-[24px] max-sm:my-[12px]" gutter={[24, 12]}>
            <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                <MainCard className="my-0 max-sm:my-[0]">
                    {/* <MyImage
                        src="/img/profile.jpg"
                        alt="profile"
                        className="max-w-full shadow-lg"
                    /> */}

                    <Button danger onClick={onClickMQTT}>
                        CLICK
                    </Button>
                </MainCard>
            </Col>
            {/* <Col xs={24} sm={24} md={16} lg={18} xl={18}>
                <MainCard className="my-0 max-sm:my-[0]">
                    <Typography.Title level={2} className="mt-0">
                        Introduction
                    </Typography.Title>
                    <div>
                        <p className="text-xl text-justify">
                            Hello, my name on my birth certificate is{" "}
                            <strong>Alfadila Anas</strong>. I frequently use{" "}
                            <strong>Alf-Anas</strong> as a username, and people
                            commonly refer to me as <strong>Alfa</strong> or{" "}
                            <strong>Anas</strong>. I have adopted{" "}
                            <strong>GeoIT Developer</strong> as my professional
                            branding name.
                        </p>
                    </div>
                    <div>
                        <p className="text-xl mb-0">
                            <a
                                className="text-black"
                                target="_blank"
                                href="https://goo.gl/maps/QXUVp9nBpnEbEVNg8"
                            >
                                <PushpinOutlined className="mr-2" />
                                Indonesia
                            </a>
                            <br />
                            <a
                                className="text-black"
                                target="_blank"
                                href="https://www.linkedin.com/in/alfadila-anas/"
                            >
                                <LinkedinOutlined className="mr-2" />
                                <span>Alfadila Anas</span>
                            </a>
                            <br />
                            <a
                                className="text-black"
                                target="_blank"
                                href="https://github.com/Alf-Anas"
                            >
                                <GithubOutlined className="mr-2" />
                                Alf-Anas
                            </a>
                            <br />
                            <a
                                className="text-black"
                                target="_blank"
                                href="https://www.youtube.com/channel/UCom_vFWnb6-1TWgtMg4lt1g"
                            >
                                <YoutubeOutlined className="mr-2" />
                                Jurnal Warga Sipil
                            </a>
                        </p>
                    </div>
                    <Tag
                        color="geekblue"
                        className="text-lg italic whitespace-break-spaces mt-4"
                    >
                        Android & Web GIS Developer, Full Stack Developer
                        (Frontend Heavy), GIS Specialists, Geodetic Engineer,
                        Smart City Enthusiast - [Trying to be an Expert
                        Generalist]
                    </Tag>

                    <Button></Button>
                </MainCard>
            </Col> */}
        </Row>
    );
}
