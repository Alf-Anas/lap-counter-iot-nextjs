import { Button, Layout as LayoutANTD, Typography } from "antd";
import MyImage from "../preview/MyImage";
import { AppstoreOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const { Header: HeaderANTD } = LayoutANTD;

export default function MainHeader() {
    const router = useRouter();
    const pathname = usePathname();
    function onGoTo() {
        if (pathname === "/") {
            router.push("/app");
        } else if (pathname === "/app") {
            router.push("/history");
        } else if (pathname === "/history") {
            router.push("/app");
        } else {
            router.push("/history");
        }
    }

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
                <Button
                    type="primary"
                    size="large"
                    icon={<AppstoreOutlined />}
                    onClick={onGoTo}
                />
            </div>
        </HeaderANTD>
    );
}
