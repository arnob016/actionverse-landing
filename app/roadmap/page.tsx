import ExecutiveSummary from "@/components/ExecutiveSummary";
import HeroWithCollapsible from "@/components/HeroWithCollapsible";
import Roadmap from "@/components/Roadmap";
import TokenDistribution from "@/components/TokenDistribution";

const RoadMapPage = () => {
    return (
        <main className="container mx-auto px-4 py-8 pt-24">
            <HeroWithCollapsible />
            <ExecutiveSummary />
            <Roadmap />
            <TokenDistribution />
        </main>
    )
}

export default RoadMapPage;