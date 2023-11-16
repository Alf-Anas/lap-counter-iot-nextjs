import MainCard from "@/components/layout/MainCard";
import MyImage from "@/components/preview/MyImage";
import { Typography } from "antd";

export default function QuoteCard() {
    return (
        <MainCard className="text-center">
            <Typography.Title level={2} className="italic text-center">
                {'"A soap bubble that want to fly higher than anyone else~"'}
            </Typography.Title>
            <div>
                <a href="https://trakteer.id/alf-anas" target="_blank">
                    <MyImage
                        src="https://cdn.trakteer.id/images/embed/trbtn-red-1.png"
                        alt="Trakteer Saya"
                        className="max-h-[50px] max-w-[181px] mx-2 max-sm:max-h-[40px]"
                    />
                </a>
                <a href="https://www.buymeacoffee.com/alf.anas" target="_blank">
                    <MyImage
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
                        alt="Buy Me A Coffee"
                        className="max-h-[50px] max-w-[181px] mx-2 max-sm:max-h-[40px]"
                    />
                </a>
            </div>
        </MainCard>
    );
}
