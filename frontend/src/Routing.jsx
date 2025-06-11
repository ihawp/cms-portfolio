import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import Portfolio from './pages/Portfolio';
import PortfolioSingle from './pages/PortfolioSingle';
import Privacy from './pages/Privacy';
import Error from './pages/Error';

function Routing() {

    return <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/portfolio" element={ <Portfolio /> } />
        <Route path="/portfolio/:id" element={ <PortfolioSingle /> } />
        <Route path="/blog" element={ <Blog /> } />
        <Route path="/blog/:id" element={ <BlogSingle /> } />
        <Route path="/privacy-policy" element={ <Privacy /> } />
        <Route path="*" element={ <Error /> } />
    </Routes>

}

export default Routing;