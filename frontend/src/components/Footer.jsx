import { Link } from 'react-router';
import ContactCard from './ContactCard';

function Footer() {
    return <footer className="flex flex-col items-center w-full mb-8 mt-12 relative pt-8">

        <div className='w-full md:w-180 flex flex-col gap-8'>
            <Link to="/" title="ihawp.com Home Page" className='w-max flex flex-row items-center gap-3'>
                <img src="/ihawp-com-logo.svg" alt={"ihawp.com Logo"} title="ihawp.com Logo" draggable="false" width={30} />
                <p className='text-lg font-semibold'>ihawp.com</p>
            </Link>

            <nav className='flex flex-row flex-wrap justify-between gap-8 mb-4 pb-8'>

                <div className='flex flex-row flex-wrap gap-8'>
                    <div className='w-30'>
                        <h2 className="text-xl mb-3">Pages</h2>
                        <ul className='flex flex-col gap-2 text-sm'>
                            <li><Link to="/" title="Home" className='opacity-80 hover:opacity-100'>Home</Link></li>
                            <li><Link to="/portfolio" title="Portfolio" className='opacity-80 hover:opacity-100'>Portfolio</Link></li>
                            <li><Link to="/blog" title="Blog" className='opacity-80 hover:opacity-100'>Blog</Link></li>
                        </ul>
                    </div>
                    <div className='w-30'>
                        <h2 className="text-xl mb-3">Contact</h2>
                        <ul className='flex flex-col gap-2 text-sm'>
                            <li><a href="https://www.linkedin.com/in/warren-chemerika-628b15275/" target="_blank" rel="noreferrer" title="LinkedIn" className='opacity-80 hover:opacity-100'>LinkedIn</a></li>
                            <li><a href="https://github.com/ihawp" title="LinkedIn" target="_blank" rel="noreferrer" className='opacity-80 hover:opacity-100'>GitHub</a></li>
                            <li><a href="mailto:ihawp@ihawp.com" className='opacity-80 hover:opacity-100'>Email</a></li>
                        </ul>
                    </div>
                    <div className='w-30'>
                        <h2 className="text-xl mb-3">Documents</h2>
                        <ul className='flex flex-col gap-2 text-sm'>
                            <li><a href="#" title="Download Warren Chemerika's Resume" className='opacity-80 hover:opacity-100'>Resume</a></li>
                            <li><a href="#" title="View Warren Chemerika's Certificate of Front-End Web Development from Saskatchewan Polytechnic." className='opacity-80 hover:opacity-100'>Saskatchewan Polytechnic Certificate</a></li>
                            <li><a href="#" title="View Warren Chemerika's Front-End Web Developer Certificate from the British Columbia Institute of Technology." className='opacity-80 hover:opacity-100'>BCIT Certificate</a></li>
                        </ul>
                    </div>
                </div>

                <ContactCard />

            </nav>

            <div className='flex flex-col sm:flex-row gap-8 justify-between md:items-center'>
                <p>&copy; ihawp.com {new Date().getFullYear()}</p>
                <nav>
                    <ul className='flex flex-col md:flex-row gap-8'>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </nav>
            </div>
        </div>

    </footer>
}

export default Footer;