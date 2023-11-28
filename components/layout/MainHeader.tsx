import {
    Button,
    Dropdown,
    Layout as LayoutANTD,
    MenuProps,
    Typography,
} from "antd";
import MyImage from "../preview/MyImage";
import {
    AppstoreOutlined,
    HomeOutlined,
    StarOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const { Header: HeaderANTD } = LayoutANTD;

export default function MainHeader() {
    const router = useRouter();
    const pathname = usePathname();

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Button
                    icon={<HomeOutlined />}
                    onClick={() => router.push("/")}
                >
                    Tutorial
                </Button>
            ),
        },
        {
            key: "2",
            label: (
                <Button
                    icon={<VideoCameraOutlined />}
                    onClick={() => router.push("/app")}
                >
                    Counter
                </Button>
            ),
        },
        {
            key: "3",
            label: (
                <Button
                    icon={<StarOutlined />}
                    onClick={() => router.push("/history")}
                >
                    Ranking
                </Button>
            ),
        },
    ];

    return (
        <HeaderANTD className="bg-primary-color py-4 px-6 z-[5] h-min shadow-sm">
            <div className="justify-between flex">
                <div className="inline-flex items-center">
                    <MyImage
                        src="/img/logo.png"
                        alt="logo"
                        className="h-[40px] mx-4 shadow-lg max-sm:h-[30px] max-sm:mx-2"
                        height="40px"
                    />
                    <Typography.Text className="font-bold text-white text-xl">
                        Mini 4WD Lap Counter
                    </Typography.Text>
                </div>
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button icon={<AppstoreOutlined />} />
                </Dropdown>
            </div>
        </HeaderANTD>
    );
}
