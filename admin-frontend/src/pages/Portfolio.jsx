import { useState } from 'react';
import PortfolioDisplay from "../components/PortfolioDisplay";
import PortfolioForm from "../components/PortfolioForm";
import { FaExternalLinkAlt } from "react-icons/fa";


function Portfolio() {

    const [addVisible, setAddVisible] = useState(false);

    return <main className='flex flex-col'>
        
        <header className="w-full my-4 px-3 flex items-center justify-between">
            <h1 className="text-xl">Portfolio Table:</h1>

            <nav aria-label="Portfolio Table Navigation">
                <ul className='flex gap-3 justify-end'>
                    <li>
                        <a className="border border-blue-500 text-blue-500 w-max p-2 rounded-lg cursor-pointer flex gap-2" href={import.meta.env.VITE_SERVER_URL} title="View the live site (ihawp.com/portfolio)."><FaExternalLinkAlt size={14} className='self-center' /> View Page</a>
                    </li>
                    <li>
                        <button className={`${addVisible ? 'bg-red-600' : 'bg-green-600'} w-max p-2 rounded-lg cursor-pointer`} onClick={(e) => setAddVisible(prev => !prev)}>{addVisible ? '- Discard' : '+ Add'}</button>
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