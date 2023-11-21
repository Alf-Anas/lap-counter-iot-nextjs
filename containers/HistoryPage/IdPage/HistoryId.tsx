import MyLoading from "@/components/MyLoading";
import { Layout as LayoutANTD, Radio, Spin } from "antd";
import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";
import MainHeader from "@/components/layout/MainHeader";
import { ActiveDataType } from "@/containers/AppPage";
import ContentCard from "./ContentCard";
import { getHistoryById } from "@/utils/api";
import { useParams } from "next/navigation";
import MainCard from "@/components/layout/MainCard";

const { Content } = LayoutANTD;

const ACTIVE_DATA_INITIAL: ActiveDataType = { a: [], b: [], c: [] };

export const TABS_KEY = {
    TRACK: "TRACK",
    LANE: "LANE",
    LAP: "LAP",
};

export interface HistoryIdContextType {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
    activeData: ActiveDataType;
    setActiveData: Dispatch<SetStateAction<ActiveDataType>>;
}

export const HistoryIdContext = createContext<HistoryIdContextType>({
    activeTab: TABS_KEY.TRACK,
    setActiveTab: () => {},
    activeData: ACTIVE_DATA_INITIAL,
    setActiveData: () => {},
});

export default function HistoryIdPage() {
    const [activeTab, setActiveTab] = useState(TABS_KEY.TRACK);
    const [activeData, setActiveData] =
        useState<ActiveDataType>(ACTIVE_DATA_INITIAL);
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        if (!params.id) return;
        setIsLoading(true);
        async function getResults() {
            const response = await getHistoryById(String(params.id));
            setActiveData(response.record);
            setIsLoading(false);
        }
        getResults();
    }, [params.id]);

    return (
        <LayoutANTD className="h-screen">
            <MyLoading />
            <HistoryIdContext.Provider
                value={{
                    activeTab,
                    setActiveTab,
                    activeData,
                    setActiveData,
                }}
            >
                <MainHeader />
                <LayoutANTD>
                    <MainCard className="!p-2">
                        <Radio.Group
                            buttonStyle="outline"
                            size="large"
                            className="w-full text-center"
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                        >
                            <Radio.Button
                                value={TABS_KEY.TRACK}
                                className="w-1/3"
                            >
                                Track
                            </Radio.Button>
                            <Radio.Button
                                value={TABS_KEY.LANE}
                                className="w-1/3"
                            >
                                Lane
                            </Radio.Button>
                            <Radio.Button
                                value={TABS_KEY.LAP}
                                className="w-1/3"
                            >
                                Lap
                            </Radio.Button>
                        </Radio.Group>
                    </MainCard>

                    <Content className="whitespace-break-spaces px-[24px] m-0 min-h-[50vh] max-sm:px-[12px] overflow-auto">
                        {isLoading && (
                            <Spin
                                size="large"
                                className="w-full text-center m-2"
                            />
                        )}
                        <ContentCard />
                    </Content>
                </LayoutANTD>
            </HistoryIdContext.Provider>
        </LayoutANTD>
    );
}
