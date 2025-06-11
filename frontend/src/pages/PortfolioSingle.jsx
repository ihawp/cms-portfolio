import { useContext } from 'react';
import { PortfolioContext } from '../providers/PortfolioProvider';
import { useParams, Link } from 'react-router-dom';

function PortfolioSingle() {

    const { posts } = useContext(PortfolioContext);

    const { id } = useParams();

    const post = posts.find(item => item.id == id);

    return post ? <div className='w-full md:w-180'>

        <section>
            <Link to="/portfolio">Back to Portfolio</Link>
        </section>

        <header>
            <h1>{post.title}</h1>

            <p>{post.intro}</p>
        </header>

        <section>

        </section>

    </div> : <>
        loading
    </>
}

export default PortfolioSingle;