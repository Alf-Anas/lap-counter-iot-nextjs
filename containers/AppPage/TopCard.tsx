import MainCard from "@/components/layout/MainCard";
import { UndoOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Radio } from "antd";
import { useContext } from "react";
import { ACTIVE_DATA_INITIAL, AppContext } from ".";

export const TABS_KEY = {
    LAPS: "LAPS",
    STATS: "STATS",
};

export default function TopCard() {
    const { activeTab, setActiveTab, setActiveData } = useContext(AppContext);

    return (
        <MainCard className="text-center !p-2 justify-between flex">
            <Radio.Group
                buttonStyle="outline"
                size="large"
                className="w-10/12"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
            >
                <Radio.Button value={TABS_KEY.LAPS} className="w-1/2">
                    Laps
                </Radio.Button>
                <Radio.Button value={TABS_KEY.STATS} className="w-1/2">
                    Stats
                </Radio.Button>
            </Radio.Group>
            <Popconfirm
                title="Clear Data"
                description="Clear data dan record ulang?"
                onConfirm={() => setActiveData(ACTIVE_DATA_INITIAL)}
                okText="Yes"
                cancelText="No"
                placement="bottomRight"
            >
                <Button danger size="large" icon={<UndoOutlined />} />
            </Popconfirm>
        </MainCard>
    );
}
