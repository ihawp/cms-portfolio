import { useContext } from "react";
import { PortfolioContext } from "../providers/PortfolioProvider";
import PortfolioItem from '../components/PortfolioItem';
import updateDocumentTitle from '../utils/updateDocumentTitle';

import {  } from 'react-icons/fa';

function Portfolio() {

    updateDocumentTitle('Portfolio | ihawp.com')

    const { posts } = useContext(PortfolioContext);

    return posts ? <div className="w-full md:w-180 mt-10">
    
        <header className="mb-8">
            <div className="w-full md:w-180">
                <div className="w-full flex flex-col items-start">
                    <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
                    <p className="max-w-120">A collection of Personal and Professional projects.</p>
                </div>
            </div>
        </header>

        <section className="flex flex-col gap-4">
            {posts ? posts.map((item, key) => {
                return <PortfolioItem item={ item } key={ key } />
            }) : null}
        </section>

    </div> : <span className="loader"></span>;
}

export default Portfolio;