import { FaReact, FaNodeJs, FaJsSquare, FaHtml5, FaCss3Alt, FaWordpress, FaPhp, FaGithub, FaLink } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatDate from '../utils/formatDate';

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

    const [selectedImage, setSelectedImage] = useState(item.images ? JSON.parse(item.images)[0] : 'default-img.webp');
    const [keyMax, setKeyMax] = useState(2);

    const dateCreated = formatDate(item.date_created);

    const updateSelectedImage = (e) => {

        setSelectedImage(e.target.dataset.item)
    }

    const updateKeyMax = (e) => {
        setKeyMax(JSON.parse(item.images).length);
    }

    return <div className="bg-[#333] rounded border border-[#666] flex flex-col-reverse md:flex-row p-4 md:p-6 gap-4 justify-between">

        <div className='flex flex-col md:max-w-[60%]'>
            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>

            <p className='mb-4 text-sm opacity-70'>{item.role} &middot; {dateCreated}</p>

            <p className='md:h-41 mb-4 md:mb-0 '>{item.intro}</p>

            <div className='flex flex-row gap-8 items-center justify-between md:justify-start'>
                <div className='flex flex-row gap-8 items-center'>
                    {item.githubURL ? <a href={item.githubURL} title={item.title + ' GitHub Link'} target="_blank" rel="noreferrer"><FaGithub size={26} /></a> : null }
                    {item.projectSite ? <a href={item.projectSite} title={item.title + ' Project Link'} target="_blank" rel="noreferrer"><FaLink size={26} /></a> : null}
                </div>
                <button onClick={() => navigate('/portfolio/' + encodeURIComponent(item.id))} className='px-3 py-2 cursor-pointer' title={`Learn more about the ${item.title} project`}>Learn More</button>
            </div>
        </div>

        {/* very wildcard image loading */}
        {/* Thank you Michael LaRoy */}
        {item?.images ? <div className='flex flex-col sm:flex-row md:flex-col gap-2'>
            <div className='w-full aspect-square'>
                <img src={import.meta.env.VITE_SERVER_URL + 'images/' + (selectedImage)} alt="" title="" draggable="false" className='w-full h-full md:w-60 md:h-60 rounded object-cover' />
            </div>
            
            <div className='flex flex-row flex-wrap sm:flex-col md:flex-row gap-2 mb-4 md:mb-0'>
                {item.images.length > 1 ? JSON.parse(item.images).map((image, key) => {
                    if (key < keyMax) { 
                        return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + image} alt="" title="" draggable="false" onClick={ updateSelectedImage } data-item={image} className={`cursor-pointer max-w-15 h-15 sm:max-w-20 md:min-w-0 sm:h-20 md:max-w-10 md:h-10 object-cover rounded border ${image === selectedImage ? 'border-[#555]' : 'border-transparent'}`} key={key} /> 
                    } else if (JSON.parse(item.images).length - 1 === key) {
                        return <div onClick={updateKeyMax} className="relative" key={key}>
                            <div className='absolute top-[-5px] right-[-5px] bg-red-500 cursor-pointer rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>+{JSON.parse(item.images).length - 2}</div>
                            <img src={import.meta.env.VITE_SERVER_URL + 'images/' + 'default-img.webp'} alt="" title="" draggable="false" className={`cursor-pointer max-w-15 h-15 sm:max-w-20 md:min-w-0 sm:h-20 md:max-w-10 md:h-10 object-cover rounded border-[#555] ${image === selectedImage ? 'border' : ''}`} key={key} />
                        </div>
                    }
                }) : null }
            </div>
        </div> : null}
    </div>
}

export default PortfolioItem;