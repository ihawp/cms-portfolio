import { Link } from 'react-router-dom';

function Footer() {
    return <footer className="text-center flex flex-col justify-center items-center gap-4 my-10">

        <Link to="/">
            <img draggable="false" src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" />
        </Link>

        <p>&copy; ihawp.com {new Date().getFullYear()}</p>

    </footer>
}

export default Footer;