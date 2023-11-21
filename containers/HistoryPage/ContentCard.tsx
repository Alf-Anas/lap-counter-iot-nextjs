import { useContext } from "react";
import { TABS_KEY } from "./TopCard";
import HistoryCard from "./HistoryCard";
import { HistoryContext } from ".";
import RankCard from "./RankCard";

export default function ContentCard() {
    const { activeTab } = useContext(HistoryContext);

    return (
        <>
            {activeTab === TABS_KEY.HISTORY && <HistoryCard />}
            {activeTab === TABS_KEY.RANK && <RankCard />}
        </>
    );
}
