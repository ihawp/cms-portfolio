import { useContext } from "react";
import { PortfolioContext } from "../providers/PortfolioProvider";

function Portfolio() {

    const { posts } = useContext(PortfolioContext);

    return <>
    
        <header>
            <h1>Portfolio</h1>
        </header>

        {posts ? posts.map((item, key) => {
            return <div key={key}>

                <p>{item.id}</p>

                <h2>{item.title}</h2>
            </div>
        }) : null}
    
    </>
}

export default Portfolio;