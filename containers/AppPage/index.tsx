import MyLoading from "@/components/MyLoading";
import TopCard, { TABS_KEY } from "./TopCard";
import { Layout as LayoutANTD } from "antd";
import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from "react";
import MainHeader from "@/components/layout/MainHeader";
import BottomCard from "./BottomCard";
import ContentCard from "./ContentCard";

const { Content } = LayoutANTD;

type ActiveLaneType = {
    a: boolean;
    b: boolean;
    c: boolean;
};

export type ActiveDataType = {
    a: ActiveDataItemType[];
    b: ActiveDataItemType[];
    c: ActiveDataItemType[];
};

export type ActiveDataItemType = {
    time: number;
    car: string;
    id: number;
};

const ACTIVE_LANE_INITIAL: ActiveLaneType = { a: true, b: true, c: true };
export const ACTIVE_DATA_INITIAL: ActiveDataType = { a: [], b: [], c: [] };

export interface AppContextType {
    activeLane: ActiveLaneType;
    setActiveLane: Dispatch<SetStateAction<ActiveLaneType>>;
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
    activeData: ActiveDataType;
    setActiveData: Dispatch<SetStateAction<ActiveDataType>>;
    refresh: number;
    setRefresh: Dispatch<SetStateAction<number>>;
}

export const AppContext = createContext<AppContextType>({
    activeLane: ACTIVE_LANE_INITIAL,
    setActiveLane: () => {},
    activeTab: TABS_KEY.TRACK,
    setActiveTab: () => {},
    activeData: ACTIVE_DATA_INITIAL,
    setActiveData: () => {},
    refresh: new Date().getTime(),
    setRefresh: () => {},
});

export default function AppPage() {
    const [activeLane, setActiveLane] =
        useState<ActiveLaneType>(ACTIVE_LANE_INITIAL);
    const [activeTab, setActiveTab] = useState(TABS_KEY.TRACK);
    const [activeData, setActiveData] =
        useState<ActiveDataType>(ACTIVE_DATA_INITIAL);
    const [refresh, setRefresh] = useState<number>(new Date().getTime());

    return (
        <LayoutANTD className="h-screen">
            <MyLoading />
            <AppContext.Provider
                value={{
                    activeLane,
                    setActiveLane,
                    activeTab,
                    setActiveTab,
                    activeData,
                    setActiveData,
                    refresh,
                    setRefresh,
                }}
            >
                <MainHeader />
                <LayoutANTD>
                    <TopCard />
                    <Content className="whitespace-break-spaces px-[24px] m-0 min-h-[50vh] max-sm:px-[12px] overflow-auto">
                        <ContentCard />
                    </Content>
                    <BottomCard />
                </LayoutANTD>
            </AppContext.Provider>
        </LayoutANTD>
    );
}
