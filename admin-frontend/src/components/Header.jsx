import { NavLink, Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

function Header() {

    const { auth, logout } = useContext(AuthContext);

    return <header className="
        flex flex-row justify-between items-center p-4
    ">

        <Link to="/">
            <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" />
        </Link>

        <nav>
            {auth ? <ul className="flex flex-row gap-12">
                <li><NavLink to="/" title="Home">Home</NavLink></li>
                <li><NavLink to="/portfolio" title="Portfolio">Portfolio</NavLink></li>
                <li><NavLink to="/blog" title="Blog">Blog</NavLink></li>
            </ul> : <ul className="flex flex-row gap-12">
                <li><a href="https://github.com/ihawp" target="_blank" rel="noreferrer" title="GitHub">GitHub</a></li>
                <li><a title="LinkedIn" href="https://www.linkedin.com/in/warren-chemerika-628b15275/" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>}
        </nav>

        <div>
            {auth ? <a title="Logout" href="#" onClick={logout}>Logout</a> : 'other button'}
        </div>

    </header>
}

export default Header;