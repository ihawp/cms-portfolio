import { Link } from 'react-router';

function Footer() {
    return <footer className="flex flex-col items-center w-full mb-30 md:mb-8 mt-8">

        <div className='w-full md:w-180 flex flex-col gap-8'>
            <Link to="/" title="ihawp.com Home Page" className='w-max'>
                <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" draggable="false" />
            </Link>

            <nav className='flex flex-col-reverse md:flex-row justify-between gap-8'>
                <div className='flex flex-row flex-wrap gap-8'>
                    <div className='w-30'>
                        <h2 className="text-xl">Pages</h2>
                        <hr className='my-4 w-5 opacity-20'></hr>
                        <ul className='flex flex-col gap-2'>
                            <li><Link to="/" title="Home">Home</Link></li>
                            <li><Link to="/portfolio" title="Portfolio">Portfolio</Link></li>
                            <li><Link to="/blog" title="Blog">Blog</Link></li>
                        </ul>
                    </div>
                    <div className='w-30'>
                        <h2 className="text-xl">Socials</h2>
                        <hr className='my-4 w-5 opacity-20'></hr>
                        <ul className='flex flex-col gap-2'>
                            <li><a href="https://www.linkedin.com/in/warren-chemerika-628b15275/" target="_blank" rel="noreferrer" title="LinkedIn">LinkedIn</a></li>
                            <li><a href="https://github.com/ihawp" title="LinkedIn" target="_blank" rel="noreferrer">GitHub</a></li>
                            <li><a href="mailto:ihawp@ihawp.com">Email</a></li>
                        </ul>
                    </div>
                    <div className='w-30'>
                        <h2 className="text-xl">Documents</h2>
                        <hr className='my-4 w-5 opacity-20'></hr>
                        <ul className='flex flex-col gap-2'>
                            <li><a href="#" title="Download Warren Chemerika's Resume">Resume</a></li>
                            <li><a href="#" title="View Warren Chemerika's Certificate of Front-End Web Development from Saskatchewan Polytechnic.">Saskatchewan Polytechnic Certificate</a></li>
                            <li><a href="#" title="View Warren Chemerika's Front-End Web Developer Certificate from the British Columbia Institute of Technology.">BCIT Certificate</a></li>
                        </ul>
                    </div>
                </div>

                <div className='w-[240px] h-40 bg-[#333] border border-[#555] rounded p-4 flex flex-col gap-2'>
                    <p>Warren Chemerika</p>
                    <a href="mailto:ihawp@ihawp.com" className='w-min'>ihawp@ihawp.com</a>
                </div>

            </nav>

            <div>
                {/* Section with drawing or something. */}
            </div>

            <div className='flex flex-row justify-between items-center'>
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