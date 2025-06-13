import { FaGlobe, FaEnvelope } from 'react-icons/fa';
import useWindowWidth from '../hooks/useWindowWidth';
import { useEffect, useState } from 'react';

function ContactCard() {

    const width = useWindowWidth();

    const [widthCheck, setWidthCheck] = useState(false);

    useEffect(() => {
        setWidthCheck(width < 768);
    }, [width]);

    return <div className='w-max pr-20 items-start text-center md:text-start justify-start md:justify-start md:items-start md:w-[240px] min-h-40 bg-[#333] border border-[#555] rounded px-4 py-3 flex flex-col overflow-hidden relative'>
        <div className='flex flex-col gap-2 z-10'>
            <p className='font-semibold text-xl md:text-lg mb-1 w-max'>Warren Chemerika</p>
            <div className='flex flex-row items-center gap-2 mb-1 text-lg md:text-sm opacity-70 hover:opacity-100'>
                <FaEnvelope size={widthCheck ? 20 : 14} />
                <a href="mailto:ihawp@ihawp.com" className='w-min'>ihawp@ihawp.com</a>
            </div>
            <div className='flex flex-row items-center gap-2 text-lg md:text-sm opacity-70 hover:opacity-100'>
                <FaGlobe size={widthCheck ? 20 : 14} />
                <a href="https://ihawp.com" title="Warren Chemerika | ihawp.com" className='w-min'>ihawp.com</a>
            </div>
        </div>
        <img src="/ihawp-com-logo.webp" alt="ihawp.com Logo" className='absolute bottom-2 right-2 w-10' draggable="false"></img>
    </div>
}

export default ContactCard;