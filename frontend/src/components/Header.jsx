import { NavLink, Link } from 'react-router';

function Header() {
    return <header>

        <Link to="/" title="ihawp.com Home Page">
            <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" draggable="false" />
        </Link>

        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/portfolio">Portfolio</NavLink></li>
                <li><NavLink to="/blog">Blog</NavLink></li>  
            </ul>
        </nav>
    </header>
}

export default Header;