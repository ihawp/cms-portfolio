import { useState } from 'react';
import PortfolioDisplay from "../components/PortfolioDisplay";
import PortfolioForm from "../components/PortfolioForm";


function Portfolio() {

    const [addVisible, setAddVisible] = useState(false);

    return <main className='flex flex-col items-center'>
        
        <header>
            <h1>Portfolio</h1>
        </header>

        <header className="w-full">
            <nav>
                <ul>
                    <li>
                        <button className="float-right bg-blue-500 w-max p-2 rounded-lg cursor-pointer" onClick={(e) => setAddVisible(prev => !prev)}>{addVisible ? '- Discard' : '+ Add New'}</button>
                    </li>
                </ul>
            </nav>
        </header>

        {addVisible ? <section className='overflow-x-visible overflow-y-hidden flex flex-col items-center'>
            <PortfolioForm />
        </section> : null}

        {addVisible ? null : <section className='w-full overflow-x-auto overflow-y-hidden'>
            <PortfolioDisplay />
        </section>}

    </main>
}

export default Portfolio;