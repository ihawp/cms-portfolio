import { FaReact, FaNodeJs, FaJsSquare, FaHtml5, FaCss3Alt, FaWordpress, FaPhp, FaGithub } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import FeaturedImageDisplay from './FeaturedImageDisplay';

const icons = {
  faReact: <FaReact size={32} />,
  faNodeJs: <FaNodeJs size={32} />,
  faJSSquare: <FaJsSquare size={32} />,
  faHtml5: <FaHtml5 size={32} />,
  faCss3Alt: <FaCss3Alt size={32} />,
  faWordpress: <FaWordpress size={32} />,
  faPhp: <FaPhp size={32} />
};

function PortfolioItem({ item }) {

    const navigate = useNavigate();

    const dateCreated = formatDate(item.date_created);

    return <div className="bg-[#333] rounded border border-[#666] flex flex-col-reverse md:flex-row p-4 md:p-6 sm:gap-4 justify-between">

        <div className='flex flex-col md:max-w-[60%]'>
            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>

            <div className='mb-4 text-sm opacity-70 flex flex-row items-center gap-2 flex-wrap'>
                <p>{item.role}</p> &middot; {dateCreated}
                <div className='flex flex-row items-center gap-2'>
                    &middot;
                    {item.githubURL ? <a href={item.githubURL} title={item.title + ' GitHub Link'} target="_blank" rel="noreferrer"><FaGithub size={16} /></a> : null }
                    {item.projectSite ? <a href={item.projectSite} title={item.title + ' Project Link'} target="_blank" rel="noreferrer"><HiOutlineExternalLink size={18} /></a> : null}
                </div>
            </div>

            <p className='md:h-41 mb-4 md:mb-0 '>{item.intro.slice(0, 200).trim()}...</p>

            <div className='flex flex-row gap-8 items-center justify-between md:justify-start'>
                <button onClick={() => navigate('/portfolio/' + encodeURIComponent(item.id))} className='border border-[#555] md:border-none md:w-max rounded cursor-pointer w-full py-2' title={`Learn more about the ${item.title} project`}>Learn More</button>
            </div>
        </div>

        <FeaturedImageDisplay 
            item={item}
            mainImageClasses="w-full aspect-square"
            containerClasses="flex flex-col sm:flex-row md:flex-col gap-2"
            secondaryClasses="flex flex-row flex-wrap sm:flex-col md:flex-row gap-2 mb-4 md:mb-0"
            imageClasses="w-full h-full md:w-60 md:h-60 rounded object-cover border border-[#555]"
            smallImageClasses="cursor-pointer max-w-15 h-15 sm:max-w-20 md:min-w-0 sm:h-20 md:max-w-10 md:h-10 object-cover rounded border"
            addClasses="flex items-center justify-center
                            cursor-pointer
                            px-5
                            w-15 h-15 sm:w-20 sm:h-20 md:w-10 md:h-10
                            border border-[#888] text-[#eeeeee] text-sm rounded"
        />
    </div>
}

export default PortfolioItem;