import { Link } from 'react-router';

function Footer() {
    return <footer className="flex flex-col items-center w-full">

        <div className='w-full md:w-190 xl:w-300 flex flex-col'>
            <Link to="/" title="ihawp.com Home Page">
                <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" draggable="false" />
            </Link>

            <nav className='flex flex-row flex-wrap'>
                <div>
                    <h2>Important</h2>
                    <ul className='flex flex-col'>
                        <li><Link to="/" title="Home">Home</Link></li>
                        <li><Link to="/portfolio" title="Portfolio">Portfolio</Link></li>
                        <li><Link to="/blog" title="Blog">Blog</Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Misc</h2>
                    <ul className='flex flex-col'>
                        <li><Link to="/" title="Home">Home</Link></li>
                        <li><Link to="/portfolio" title="Portfolio">Portfolio</Link></li>
                        <li><Link to="/blog" title="Blog">Blog</Link></li>
                    </ul>
                </div>
            </nav>

            <div>
                {/* Section with drawing or something. */}
            </div>

            <div className='flex flex-row justify-between items-center'>
                <p>ihawp 205</p>
                <Link to="">Privacy Policy</Link>
            </div>
        </div>

    </footer>
}

export default Footer;