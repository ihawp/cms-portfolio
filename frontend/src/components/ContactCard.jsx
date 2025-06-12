import { FaGlobe, FaEnvelope } from 'react-icons/fa';

function ContactCard() {
    return <div className='w-max md:w-[240px] min-h-40 bg-[#333] border border-[#555] rounded px-4 py-3 flex flex-col overflow-hidden relative'>
        <div className='flex flex-col gap-2 z-10'>
            <p className='font-bold mb-1'>Warren Chemerika</p>
            <div className='flex flex-row items-center gap-2'>
                <FaEnvelope size={14} className='opacity-50' />
                <a href="mailto:ihawp@ihawp.com" className='w-min'>ihawp@ihawp.com</a>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <FaGlobe size={14} className='opacity-50' />
                <a href="https://ihawp.com" title="Warren Chemerika | ihawp.com" className='w-min'>ihawp.com</a>
            </div>
        </div>
        <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" className='absolute bottom-2 right-2 w-10 opacity-30' draggable="false"></img>
    </div>
}

export default ContactCard;