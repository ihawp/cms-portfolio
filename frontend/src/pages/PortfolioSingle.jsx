import { useContext, useState, useEffect } from 'react';
import { PortfolioContext } from '../providers/PortfolioProvider';
import { useParams, Link } from 'react-router-dom';
import { 
    FaReact,
    FaNodeJs,
    FaJsSquare,
    FaHtml5,
    FaCss3Alt,
    FaWordpress,
    FaPhp,
    FaGithub,
    FaArrowAltCircleLeft,
    FaShareAlt,
    FaExclamationTriangle,
    FaLightbulb
} from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import formatDate from '../utils/formatDate';
import copyWindowLocation from '../utils/copyWindowLocation';
import updateDocumentTitle from '../utils/updateDocumentTitle';

const icons = {
  faReact: <FaReact size={16} />,
  faNodeJs: <FaNodeJs size={16} />,
  faJSSquare: <FaJsSquare size={16} />,
  faHtml5: <FaHtml5 size={16} />,
  faCss3Alt: <FaCss3Alt size={16} />,
  faWordpress: <FaWordpress size={16} />,
  faPhp: <FaPhp size={16} />
};

function PortfolioSingle() {

    const { posts } = useContext(PortfolioContext);

    const { id } = useParams();

    const post = posts.find(item => item.id == id);

    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        setSelectedImage(post ? post.images[0] : ['default-img.webp']);
        post ? updateDocumentTitle(`${post.title} | ihawp.com`) : null;
    }, [post])

    const dateCreated = formatDate(post ? post.date_created : new Date());

    const updateSelectedImage = (e) => {
        setSelectedImage(e.target.dataset.item)
    }

    const updateSelectedImageByKey = (e) => {

        if (e.key === 'Enter') {
            updateSelectedImage(e);
        }

    }

    return post ? <div className='w-full md:w-180 mt-10'>

        <header className='mb-8'>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className='flex flex-row items-center flex-wrap mb-8 opacity-70 gap-2'>
                <p>{post.role}</p> &middot;
                <p>{dateCreated}</p>
                &middot;
                {post.githubURL ? <a href={post.githubURL} title={post.title + ' GitHub Link'} target="_blank" rel="noreferrer"><FaGithub size={16} /></a> : null }
                {post.projectSite ? <a href={post.projectSite} title={post.title + ' Project Link'} target="_blank" rel="noreferrer"><HiOutlineExternalLink size={18} /></a> : null}
                <button onClick={ copyWindowLocation } title={post.title + ' Project Link'} className='cursor-pointer'><FaShareAlt size={15} /></button>
                &middot;
                {post.toolsUsed.length > 0 ? <div className='flex flex-row gap-2' title="Tools Used">
                    {post.toolsUsed.map((item, key) => {
                        return <div key={key}>{icons[item]}</div>
                    })}
                </div> : null}
            </div>

            <p>{post.intro}</p>
        </header>

        <section className='flex flex-row gap-2 height-200 mb-8'>
            <div className='w-full aspect'>
                {selectedImage ? <img src={import.meta.env.VITE_SERVER_URL + 'images/' + (selectedImage)} alt="" title="" draggable="false" className='w-full h-full rounded object-cover border-[#555] border' /> : <div className='w-full h-50 flex justify-center items-center'><div className="loader"></div></div>}
            </div>
            <div className='flex flex-col gap-2 mb-4 md:mb-0'>
                {post.images.length > 1 ? post.images.map((item, key) => { if (key < 5) return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + item} tabIndex={0} onKeyDown={ updateSelectedImageByKey } alt="" title="" draggable="false" onClick={ updateSelectedImage } data-item={item} className={`cursor-pointer w-10 h-10 object-cover rounded border-[#555] ${item === selectedImage ? 'border' : ''}`} key={key} /> }) : null}
            </div>
        </section>

        <section className='mb-8'>
            <p>{post.solutionSummary}</p>
        </section>

        {post.keyTasks.length > 0 ? <section className='mb-8'>
            <h2 className="text-xl font-bold mb-4">Key Tasks Completed</h2>
            <ul className='list-disc pl-8 flex flex-col gap-2'>
                {post.keyTasks.map((item, key) => {
                    return <li key={key}>
                        <p>{item.task}</p>
                    </li>
                })}
            </ul>

        </section> : null}

        {post.takeaways.length > 0 ? <section>
            {post.takeaways.map((item, key) => {
                return <div key={key} className='mb-8'>
                    <p>{item.takeaway}</p>
                </div>
            })}
        </section> : null}

        {post.challenges.length > 0 ? <section className='mb-8'>
            <h2 className='text-xl font-bold mb-4'>Challenges</h2>
            <div className="flex flex-row flex-wrap gap-4">
                {post.challenges.map((item, key) => {
                    return <div key={key} className='flex flex-col bg-[#333] flex-grow-1 min-w-50 border border-[#555] rounded px-3 py-2'>
                        <div className="flex flex-row items-center gap-2">
                            <FaExclamationTriangle size={16} className="opacity-70" />
                            <p>{item.challenge}</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <FaLightbulb size={16} className="opacity-70" />
                            <p>{item.solution}</p>
                        </div>
                    </div>
                })}
            </div>
        </section> : null}

        {post.timeline.length > 0 ? <section className='mb-8'>
            <h2 className="text-xl font-bold mb-4">Project Timeline</h2>
            <div className='pl-2'>
                <div className='border-l border-[#444] flex flex-col gap-4'>
                    {post.timeline.map((item, key) => {
                        return <ul className="flex flex-col relative gap-2" key={key}>
                            <li className={`absolute left-[-6px] top-2 w-3 h-3 rounded-full ${key === 0 ? 'bg-yellow-500' : ''} ${key === post.timeline.length - 1 ? 'bg-red-500' : 'bg-green-500'}`}></li>
                            <li className='text-lg font-semibold ml-4'>{item.date}</li>
                            <li>
                                <ul className='ml-4 flex flex-col gap-2'>
                                    <li className='font-medium'><p>{item.title}</p></li>
                                    <li><p>{item.descriptor}</p></li>
                                </ul>
                            </li>
                        </ul>
                    })}
                </div>
            </div>
        </section> : null}

        {post.skillsApplied.length > 0 ? <section className='flex flex-col gap-4'>
            <h2 className='text-xl font-bold'>Key Skills</h2>
            <div className='flex flex-row gap-2'>
                {post.skillsApplied.map((item, key) => {
                    return <p key={key}>{item.skill}</p>
                })}
            </div>
        </section> : null}

        <section className="mt-8 mb-4 flex justify-center">
            <Link to="/portfolio" className='flex flex-row gap-2 items-center'><FaArrowAltCircleLeft size={20}/> Back to Portfolio</Link>
        </section>

    </div> : <div className='loader h-screen'></div>
}

export default PortfolioSingle;