import { NavLink, Link } from 'react-router';
import { useState } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';

function Header() {

    const [navState, setNavState] = useState(false);

    const width = useWindowWidth();

    return <header className='flex flex-col items-center w-full md:my-4'>

        <div className={`${width < 768 ? navState ? 'w-[50%] opacity' : 'w-0 opacity-0 invisible' : null } transition-all flex flex-col bg-[#333] border-l border-l-[5px] border-[#444] h-screen fixed top-0 right-0 items-center
                        md:flex-row md:w-190 md:bg-transparent md:relative md:h-min md:justify-between md:border-none
                        xl:w-300
            `}
            aria-hidden={navState}>
            <Link to="/" title="ihawp.com Home Page">
                <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" draggable="false" />
            </Link>

            <nav>
                <ul className="flex flex-col md:flex-row md:gap-16">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/portfolio">Portfolio</NavLink></li>
                    <li><NavLink to="/blog">Blog</NavLink></li>
                </ul>
            </nav>

            <nav>
                <ul>
                    <li><a href="" title="GitHub">GitHub</a></li>
                    <li><a href="" title="LinkedIn">LinkedIn</a></li>
                </ul>
            </nav>
        </div>

        {width < 768 ? <button className="fixed bottom-10 right-10 bg-[#222] w-10 h-10 rounded-[100px] cursor-pointer" onClick={ (e) => setNavState(prev => !prev) }>

            {navState ? 'close' : 'open'}

        </button> : null}

    </header>
}

export default Header;