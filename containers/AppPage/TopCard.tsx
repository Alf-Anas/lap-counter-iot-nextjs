import MainCard from "@/components/layout/MainCard";
import { UndoOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Radio } from "antd";
import { useContext } from "react";
import { ACTIVE_DATA_INITIAL, AppContext } from ".";

export const TABS_KEY = {
    TRACK: "TRACK",
    LANE: "LANE",
    LAP: "LAP",
};

export default function TopCard() {
    const { activeTab, setActiveTab, setActiveData, setRefresh } =
        useContext(AppContext);

    return (
        <MainCard className="text-center !p-2 justify-between flex">
            <Popconfirm
                title="Clear Data"
                description="Clear data dan record ulang?"
                onConfirm={() => {
                    setActiveData(ACTIVE_DATA_INITIAL);
                    setRefresh(new Date().getTime());
                }}
                okText="Yes"
                cancelText="No"
                placement="bottomRight"
            >
                <Button danger size="large" icon={<UndoOutlined />} />
            </Popconfirm>
            <Radio.Group
                buttonStyle="outline"
                size="large"
                className="w-10/12"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
            >
                <Radio.Button value={TABS_KEY.TRACK} className="w-1/3">
                    Track
                </Radio.Button>
                <Radio.Button value={TABS_KEY.LANE} className="w-1/3">
                    Lane
                </Radio.Button>
                <Radio.Button value={TABS_KEY.LAP} className="w-1/3">
                    Lap
                </Radio.Button>
            </Radio.Group>
        </MainCard>
    );
}
