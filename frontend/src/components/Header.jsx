import { NavLink, Link } from 'react-router';
import { useState, useEffect } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Header() {

    const [navState, setNavState] = useState(false);

    const width = useWindowWidth();
    const widthCheck = width < 768;

    const updateNavState = () => {
        setNavState(prev => {

            document.body.style.overflow = prev ? 'auto' : 'hidden';

            return !prev;
        });
    }

    useEffect(() => {
        width > 768 ? document.body.style.overflow = 'auto' : navState ? document.body.style.overflow = 'hidden' : null;
    }, [width]);

    return <header className='flex flex-col items-center md:my-4 header-main relative'>

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
        {widthCheck ? navState ? <div className="w-[40%] sm:w-[50%] h-screen fixed top-0 left-0 z-100" onClick={ updateNavState }></div> : null : null}

        <div className={`${widthCheck ? navState ? 'w-[60%] sm:w-[50%] opacity p-4 visible ' : 'w-0 opacity-0 invisible' : '' } 
                        transition-all flex flex-col bg-[#333] border-l border-l-[5px] border-[#555] h-screen fixed top-0 right-0 gap-16 z-100 overflow-scroll
                        md:items-center md:flex-row md:w-180 md:bg-transparent md:relative md:h-min md:justify-between md:border-none md:p-0 md:gap-0 md:overflow-auto mb-2
            `}>
            
            <div className='md:flex md:justify-start md:w-30'>
                <Link to="/" title="ihawp.com Home Page">
                    <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" draggable="false" width={width < 768 ? 45 : 30} />
                </Link>
            </div>

            <nav aria-label="Main Site Navigation" className='md:w-full md:flex md:justify-center'>
                <ul className="flex flex-col md:flex-row gap-12 md:gap-16 text-2xl md:text-base gap-8">
                    <li><NavLink to="/" title="Home">Home</NavLink></li>
                    <li><NavLink to="/portfolio" title="Portfolio" end>Portfolio</NavLink></li>
                    <li><NavLink to="/blog" title="Blog" end>Blog</NavLink></li>
                </ul>
            </nav>

            <nav aria-label="Socials Navigation" className='md:flex md:items-center md:justify-end md:w-30'>
                <ul className="flex flex-row gap-6 md:gap-8 items-center">
                    <li><a href="https://github.com/ihawp" target="_blank" rel="noreferrer" title="GitHub: ihawp" ><FaGithub size={widthCheck ? 34 : 26} /></a></li>
                    <li><a href="https://www.linkedin.com/in/warren-chemerika-628b15275/" target="_blank" rel="noreferrer" title="LinkedIn: Warren Chemerika"><FaLinkedin size={widthCheck ? 34 : 26} /></a></li>
                </ul>
            </nav>

        </div>

        {width < 768 ? <div className='fixed bottom-5 right-5 min-h-1 safe-bottom flex justify-end rounded-full z-100'>
            <button className={`bg-[#222] w-14 h-14 rounded-[100px] cursor-pointer p-2 z-101 border border-[#555] flex items-center justify-center`} title="Mobile Navigation Button" onClick={ updateNavState }>
                <div className={`navigation-icon ${navState ? 'active' : ''}`}></div>
            </button>
        </div> : null}

    </header>
}

export default Header;