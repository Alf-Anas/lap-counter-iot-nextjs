import QuoteCard from "./QuoteCard";
import IntroCard from "./IntroCard";
import AboutCard from "./AboutCard";
import ProjectCard from "./ProjectCard";
import { lazy } from "react";
import MyLoading from "@/components/MyLoading";

const ToolCard = lazy(() => import("./ToolCard"));


export default function HomePage() {
    return (
        <>
            <MyLoading />
            {/* <IntroCard /> */}
            <AboutCard />
            {/* <ProjectCard />
            <ToolCard />
            <QuoteCard /> */}
        </>
    );
}
