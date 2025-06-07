import { NavLink } from "react-router-dom";

function Header() {
    return <header>
        <nav>
            <ul className="flex flex-row">
                <li><NavLink to="/" title="Home">Home</NavLink></li>
                <li><NavLink to="/portfolio" title="Portfolio">Portfolio</NavLink></li>
                <li><NavLink to="/blog" title="Blog">Blog</NavLink></li>
                <li><a href="https://github.com/ihawp" target="_blank" title="My GitHub Portfolio | Username: ihawp">GitHub</a></li>
                <li><a title="" href="" target="">LinkedIn</a></li>
            </ul>
        </nav>
    </header>
}

export default Header;