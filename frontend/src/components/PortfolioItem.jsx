import { FaReact, FaNodeJs, FaJsSquare, FaHtml5, FaCss3Alt, FaWordpress, FaPhp, FaGithub, FaLink } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const dateCreated = new Date(item.date_created);

    const updateSelectedImage = (e) => {
        setSelectedImage(e.target.dataset.item)
    }

    return <div className="bg-[#333] rounded border border-[#666] flex flex-col-reverse md:flex-row p-4 justify-between">

        <div className='flex flex-col md:max-w-[60%]'>
            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>

            <p className='mb-4 text-sm opacity-70'>{item.role} &middot; {dateCreated.getFullYear()}-{dateCreated.getMonth > 9 ? '' : '0'}{dateCreated.getMonth() + 1}-{dateCreated.getDate() > 9 ? '' : '0'}{dateCreated.getDate()}</p>

            <p className='md:h-41 mb-4 md:mb-0 '>{item.intro}</p>

            <div className='flex flex-row gap-8 items-center justify-between md:justify-start'>
                <div className='flex flex-row gap-8 items-center'>
                    {item.githubURL ? <a href={item.githubURL} title={item.title + ' GitHub Link'} target="_blank" rel="noreferrer"><FaGithub size={26} /></a> : null }
                    {item.projectSite ? <a href={item.projectSite} title={item.title + ' Project Link'} target="_blank" rel="noreferrer"><FaLink size={26} /></a> : null}
                </div>
                <button onClick={() => navigate('/portfolio/' + encodeURIComponent(item.id))} className='px-3 py-2 bg-[#555] rounded cursor-pointer' title={`Learn more about the ${item.title} project`}>Learn More</button>
            </div>
        </div>

        {/* very wildcard image loading */}
        {/* Thank you Michael LaRoy */}
        <div className='flex flex-col gap-2'>
            <div className='w-full aspect-square'>
                <img src={import.meta.env.VITE_SERVER_URL + 'images/' + (selectedImage)} alt="" title="" draggable="false" className='w-full h-full md:w-60 md:h-60 rounded object-cover' />
            </div>
            
            <div className='flex flex-row gap-2 mb-4 md:mb-0'>
                {item.images.length > 1 ? JSON.parse(item.images).map((item, key) => { if (key < 5) return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + item} alt="" title="" draggable="false" onClick={ updateSelectedImage } data-item={item} className={`cursor-pointer w-10 h-10 object-cover rounded border-[#555] ${item === selectedImage ? 'border' : ''}`} key={key} /> }) : null}
            </div>
        </div>
    </div>
}

export default PortfolioItem;