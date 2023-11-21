import { useContext } from "react";
import { HistoryIdContext, TABS_KEY } from "./HistoryId";
import TrackCard from "@/containers/AppPage/TrackCard";
import LaneCard from "@/containers/AppPage/LaneCard";
import LapCard from "@/containers/AppPage/LapCard";

export default function ContentCard() {
    const { activeTab, activeData } = useContext(HistoryIdContext);

    return (
        <>
            {activeTab === TABS_KEY.TRACK && (
                <TrackCard activeData={activeData} />
            )}
            {activeTab === TABS_KEY.LANE && (
                <LaneCard activeData={activeData} />
            )}
            {activeTab === TABS_KEY.LAP && <LapCard activeData={activeData} />}
        </>
    );
}
