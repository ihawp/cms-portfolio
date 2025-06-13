import { useContext, useEffect } from 'react';
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
    FaLightbulb,
    FaKey
} from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import formatDate from '../utils/formatDate';
import copyWindowLocation from '../utils/copyWindowLocation';
import updateDocumentTitle from '../utils/updateDocumentTitle';
import FeaturedImageDisplay from '../components/FeaturedImageDisplay';

const icons = {
  faReact: <FaReact size={16} />,
  faNodeJs: <FaNodeJs size={16} />,
  faJSSquare: <FaJsSquare size={16} />,
  faHtml5: <FaHtml5 size={16} />,
  faCss3Alt: <FaCss3Alt size={16} />,
  faWordpress: <FaWordpress size={16} />,
  faPhp: <FaPhp size={20} />
};

function PortfolioSingle() {

    const { posts } = useContext(PortfolioContext);

    const { id } = useParams();

    const post = posts.find(item => item.id === Number(id));

    useEffect(() => {
        if (post) {
            updateDocumentTitle(`${post.title} | ihawp.com`);
        }
    }, [post])

    const dateCreated = formatDate(post ? post.date_created : new Date());

    return post ? <article className='w-full md:w-180 mt-10'>

        <header className='mb-8'>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className='flex flex-row items-center flex-wrap mb-8 opacity-70 gap-2'>
                <p>{post.role}</p> &middot;
                <p>{dateCreated}</p>
                <div className="flex flex-row items-center gap-2">
                    &middot;
                    {post.githubURL ? <a href={post.githubURL} title={post.title + ' GitHub Link'} target="_blank" rel="noreferrer"><FaGithub size={16} /></a> : null }
                    {post.projectSite ? <a href={post.projectSite} title={post.title + ' Project Link'} target="_blank" rel="noreferrer"><HiOutlineExternalLink size={18} /></a> : null}
                    <button onClick={ copyWindowLocation } title={post.title + ' Project Link'} className='cursor-pointer'><FaShareAlt size={15} /></button>
                </div>
                {post.toolsUsed.length > 0 ? <div className='flex flex-row gap-2 items-center' title="Tools Used">
                    &middot;
                    {post.toolsUsed.map((item, key) => {
                        return <div key={key}>{icons[item]}</div>
                    })}
                </div> : null}
            </div>

            <p>{post.intro}</p>
        </header>

        <FeaturedImageDisplay 
            item={post} 
            mainImageClasses="w-full aspect"
            containerClasses='flex flex-row gap-2 mb-8'
            secondaryClasses='flex flex-col gap-2 mb-4 md:mb-0'
            imageClasses='w-full h-full rounded object-cover border border-[#555]'
            smallImageClasses="cursor-pointer max-w-10 h-10 object-cover rounded border"
            addClasses="flex items-center justify-center
                            cursor-pointer
                            px-5
                            w-10 h-10
                            border border-[#888] text-[#eeeeee] text-sm rounded"
        />

        <section className='mb-8'>
            <p>{post.solutionSummary}</p>
        </section>

        {post.keyTasks.length > 0 ? <section className='mb-8 border border-[#555] p-4 md:p-6 bg-[#333] rounded'>
            <div className='flex flex-row items-center gap-3 mb-6'>
                <div className='opacity-70'>
                    <FaKey size={16} />
                </div>
                <h2 className="text-xl font-semibold">Key Tasks Completed</h2>
            </div>
            <ul className='list-disc pl-8 flex flex-col gap-2 mb-2 opacity-90'>
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
            <h2 className='text-xl font-bold mb-4'>Challenges Faced</h2>
            <div className="flex flex-row flex-wrap gap-4">
                {post.challenges.map((item, key) => {
                    return <div key={key} className='flex flex-col bg-[#333] w-full sm:w-[calc(50%-8px)] md:w-[352px] border border-[#555] rounded p-4 gap-2'>
                        <div className="flex flex-row items-start gap-2">
                            <span className='mt-2'>
                                <FaExclamationTriangle size={16} className="opacity-70" />
                            </span>
                            <p>{item.challenge}</p>
                        </div>
                        <div className="flex flex-row items-start gap-2">
                            <span className='mt-2'>
                                <FaLightbulb size={16} className="opacity-70" />
                            </span>
                            <p>{item.solution}</p>
                        </div>
                    </div>
                })}
            </div>
        </section> : null}

        <section className='flex flex-col sm:flex-row gap-4'>
            {post.timeline.length > 0 ? <div className='mb-8 w-full'>
                <h2 className="text-xl font-bold mb-4">Project Timeline</h2>
                <div className='pl-2'>
                    <div className='border-l border-[#444] flex flex-col gap-8'>
                        {post.timeline.map((item, key) => {
                            return <ul className="flex flex-col relative gap-2" key={key}>
                                <li className={`absolute left-[-4px] top-2.5 w-2 h-2 rounded-full ${key === 0 ? 'bg-yellow-500' : ''} ${key === post.timeline.length - 1 ? 'bg-red-500' : 'bg-green-500'}`}></li>
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
            </div> : null}

            {post.skillsApplied.length > 0 ? <div className='w-full flex flex-col gap-4 max-w-80 w-80 mb-8'>
                <h2 className='text-xl font-bold'>Skills Applied</h2>
                <ul className='flex flex-row flex-wrap gap-2'>
                    {post.skillsApplied.map((item, key) => {
                        return <li key={key} className='border border-[#555] bg-[#333] rounded px-2 py-1'><p>{item.skill}</p></li>
                    })}
                </ul>
            </div> : null}
        </section>

        <section className="mt-8 mb-4 flex justify-center">
            <Link to="/portfolio" className='flex flex-row gap-2 items-center' title="Back to Portfolio Page"><FaArrowAltCircleLeft size={20}/> Back to Portfolio</Link>
        </section>

    </article> : <div className='loader h-screen'></div>
}

export default PortfolioSingle;