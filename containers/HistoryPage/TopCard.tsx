import MainCard from "@/components/layout/MainCard";
import { Radio } from "antd";
import { useContext } from "react";
import { HistoryContext } from ".";

export const TABS_KEY = {
    HISTORY: "HISTORY",
    RANK: "RANK",
};

export default function TopCard() {
    const { activeTab, setActiveTab } = useContext(HistoryContext);

    return (
        <MainCard className="text-center !p-2 justify-between flex">
            <Radio.Group
                buttonStyle="outline"
                size="large"
                className="w-full"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
            >
                <Radio.Button value={TABS_KEY.HISTORY} className="w-1/2">
                    History
                </Radio.Button>
                <Radio.Button value={TABS_KEY.RANK} className="w-1/2">
                    Rank
                </Radio.Button>
            </Radio.Group>
        </MainCard>
    );
}
