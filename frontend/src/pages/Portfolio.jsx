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

                {JSON.parse(item.images).map((item, key) => {
                    return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + item} key={key} alt="" title="" draggable="false" />
                })}
            </div>
        }) : null}
    
    </>
}

export default Portfolio;