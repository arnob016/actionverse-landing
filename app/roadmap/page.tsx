import ExecutiveSummary from "@/components/ExecutiveSummary";
import HeroWithCollapsible from "@/components/HeroWithCollapsible";
import Roadmap from "@/components/Roadmap";
import TokenDistribution from "@/components/TokenDistribution";
import { Spotlight } from "@/components/ui/spotlight";

const RoadMapPage = () => {
    return (
        <main className="container mx-auto px-4 py-8 pt-24">
        <Spotlight className="">
            <HeroWithCollapsible />
            <ExecutiveSummary />
            <Roadmap />
            <TokenDistribution />
        </Spotlight></main>
    )
}

export default RoadMapPage;