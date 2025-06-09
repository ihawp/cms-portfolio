import { Link } from 'react-router';

function Footer() {
    return <>

        <nav>
            <ul>
                <li>
                    <Link to="/" title="ihawp.com Home Page">
                        <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" draggable="false" />
                    </Link>    
                </li>
            </ul>
        </nav>

    </>
}

export default Footer;