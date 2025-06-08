import { useState } from 'react';

import PortfolioDisplay from "../components/PortfolioDisplay";
import PortfolioForm from "../components/PortfolioForm";


function Portfolio() {

    const [addVisible, setAddVisible] = useState(false);

    return <main className="flex flex-col items-center">
        
        <header>
            <h1>Portfolio</h1>
        </header>

        <button onClick={(e) => setAddVisible(prev => !prev)}>{addVisible ? 'Nevermind' : 'Add New'}</button>

        {addVisible ? <PortfolioForm /> : <PortfolioDisplay />}

    </main>
}

export default Portfolio;