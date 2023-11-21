import MyLoading from "@/components/MyLoading";
import { Layout as LayoutANTD } from "antd";
import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";
import MainHeader from "@/components/layout/MainHeader";
import ContentCard from "./ContentCard";
import TopCard, { TABS_KEY } from "./TopCard";
import { getAllHistory } from "@/utils/api";
import { HistoryListType } from "@/types/history.interface";

const { Content } = LayoutANTD;

interface HistoryContextType {
    historyList: HistoryListType;
    setHistoryList: Dispatch<SetStateAction<HistoryListType>>;
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const HistoryContext = createContext<HistoryContextType>({
    historyList: [],
    setHistoryList: () => {},
    activeTab: TABS_KEY.HISTORY,
    setActiveTab: () => {},
    isLoading: false,
    setIsLoading: () => {},
});

export default function HistoryPage() {
    const [historyList, setHistoryList] = useState<HistoryListType>([]);
    const [activeTab, setActiveTab] = useState(TABS_KEY.HISTORY);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function getResults() {
            const response = await getAllHistory();
            setHistoryList(response);
            setIsLoading(false);
        }
        getResults();
    }, []);

    return (
        <LayoutANTD className="h-screen">
            <MyLoading />
            <HistoryContext.Provider
                value={{
                    isLoading,
                    setIsLoading,
                    historyList,
                    setHistoryList,
                    activeTab,
                    setActiveTab,
                }}
            >
                <MainHeader />
                <LayoutANTD>
                    <TopCard />
                    <Content className="whitespace-break-spaces px-[24px] m-0 min-h-[50vh] max-sm:px-[12px] overflow-auto">
                        <ContentCard />
                    </Content>
                </LayoutANTD>
            </HistoryContext.Provider>
        </LayoutANTD>
    );
}
