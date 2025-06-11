import { useContext } from "react";
import { PortfolioContext } from "../providers/PortfolioProvider";
import PortfolioItem from '../components/PortfolioItem';

import {  } from 'react-icons/fa';

function Portfolio() {

    const { posts } = useContext(PortfolioContext);

    return <div className="w-full md:w-190 xl:w-300">
    
        <header>
            <h1>Portfolio</h1>
        </header>

        {posts ? posts.map((item, key) => {
            return <PortfolioItem item={ item } key={ key } />
        }) : null}

    </div>
}

export default Portfolio;