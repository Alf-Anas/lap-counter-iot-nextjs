import { Layout as LayoutANTD, Typography } from "antd";
import MyImage from "../preview/MyImage";

const { Header: HeaderANTD } = LayoutANTD;

export default function MainHeader() {
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
                    <Typography.Text className="font-bold text-white text-2xl">
                        Mini 4WD Lap Counter
                    </Typography.Text>
                </div>
            </div>
        </HeaderANTD>
    );
}
