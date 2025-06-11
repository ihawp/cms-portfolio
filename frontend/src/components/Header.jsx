import { NavLink, Link } from 'react-router';
import { useState } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Header() {

    const [navState, setNavState] = useState(false);

    const width = useWindowWidth();
    const widthCheck = width < 768;

    const updateNavState = (e) => {
        setNavState(prev => !prev);
    }

    return <header className='flex flex-col items-center md:my-4'>

        {/* for main header (always visible) on mobile */}
        {widthCheck ? <div className='w-full flex justify-start'>
            <Link to="/" title="ihawp.com Home Page">
                <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" draggable="false" />
            </Link>
        </div> : null}

        {/* 
            creates div 'to the left' of the navigation when the navigation is open on mobile 
            this div is clickable, when clicked it updates the nav state using the same method as the
            open/close button
        */}
        {widthCheck ? navState ? <div className="w-[50%] h-screen fixed top-0 left-0" onClick={ updateNavState }></div> : null : null}

        <div className={`${widthCheck ? navState ? 'w-[50%] opacity' : 'w-0 opacity-0 invisible' : null } 
                        transition-all flex flex-col bg-[#333] border-l border-l-[5px] border-[#444] h-screen fixed top-0 right-0 gap-12 p-4
                        md:items-center md:flex-row md:w-180 md:bg-transparent md:relative md:h-min md:justify-between md:border-none md:p-0
            `}>
            
            <div className='md:flex md:justify-start md:w-30'>
                <Link to="/" title="ihawp.com Home Page">
                    <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" draggable="false" />
                </Link>
            </div>

            <nav aria-label="Main Site Navigation" className='md:w-full md:flex md:justify-center'>
                <ul className="flex flex-col md:flex-row md:gap-16 font-semibold text-2xl md:text-base gap-8">
                    <li><NavLink to="/" title="Home">Home</NavLink></li>
                    <li><NavLink to="/portfolio" title="Portfolio">Portfolio</NavLink></li>
                    <li><NavLink to="/blog" title="Blog">Blog</NavLink></li>
                </ul>
            </nav>

            <nav aria-label="Socials Navigation" className='md:flex md:items-center md:justify-end md:w-30'>
                <ul className="flex flex-row gap-6 md:gap-8 items-center">
                    <li><a href="https://github.com/ihawp" target="_blank" rel="noreferrer" title="GitHub: ihawp" ><FaGithub size={widthCheck ? 34 : 26} /></a></li>
                    <li><a href="https://www.linkedin.com/in/warren-chemerika-628b15275/" target="_blank" rel="noreferrer" title="LinkedIn: Warren Chemerika"><FaLinkedin size={widthCheck ? 34 : 26} /></a></li>
                </ul>
            </nav>
        </div>

        {width < 768 ? <button className={`fixed bottom-10 right-10 bg-[#222] w-10 h-10 rounded-[100px] cursor-pointer p-2`} title="Mobile Navigation Button" onClick={ updateNavState }>
            <div className={`navigation-icon ${navState ? 'active' : ''}`}></div>
        </button> : null}

    </header>
}

export default Header;