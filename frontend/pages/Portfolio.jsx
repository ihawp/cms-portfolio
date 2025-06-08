import PortfolioDisplay from "../components/PortfolioDisplay";
import PortfolioForm from "../components/PortfolioForm";

function Portfolio() {
    return <main className="flex flex-col items-center">
        Portfolio
        <PortfolioForm />

        <PortfolioDisplay />
    </main>
}

export default Portfolio;