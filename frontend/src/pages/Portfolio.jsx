import PortfolioDisplay from "../components/PortfolioDisplay";
import PortfolioForm from "../components/PortfolioForm";

function Portfolio() {
    return <main className="flex flex-col items-center">
        
        <header>
            <h1>Portfolio</h1>
        </header>

        <PortfolioDisplay />
        <PortfolioForm />

    </main>
}

export default Portfolio;