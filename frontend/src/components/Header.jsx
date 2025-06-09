import { NavLink } from 'react-router';

function Header() {
    return <header>
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/portfolio">Portfolio</NavLink></li>
            </ul>
        </nav>
    </header>
}

export default Header;