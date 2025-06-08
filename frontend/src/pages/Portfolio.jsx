import { NavLink, Outlet } from 'react-router';
import PortfolioDisplay from "../components/PortfolioDisplay";
import PortfolioForm from "../components/PortfolioForm";

// Should have its own routing and use Outlet

function Portfolio() {
    return <main className="flex flex-col items-center">
        
        <header>
            <h1>Portfolio</h1>
        </header>

        <header>
            <nav>
                <ul>
                    <li><NavLink to="/portfolio/form">Add Form</NavLink></li>
                </ul>
            </nav>
        </header>

        <section>
            <Outlet />
        </section>
        <PortfolioForm />

        <PortfolioDisplay />
    </main>
}

export default Portfolio;