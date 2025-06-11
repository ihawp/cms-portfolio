import { useContext, useState } from 'react';
import { PortfolioContext } from '../providers/PortfolioProvider';
import { useParams, Link } from 'react-router-dom';
import { FaReact, FaNodeJs, FaJsSquare, FaHtml5, FaCss3Alt, FaWordpress, FaPhp, FaGithub, FaLink, FaArrowAltCircleLeft } from 'react-icons/fa';
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

function PortfolioSingle() {

    const { posts } = useContext(PortfolioContext);

    const { id } = useParams();

    const post = posts.find(item => item.id == id);

    const parseImages = post ? JSON.parse(post.images) : ['default-img.webp'];

    console.log(parseImages);

    const [selectedImage, setSelectedImage] = useState(parseImages[0]);

    const dateCreated = formatDate(post ? post.date_created : new Date());

    const updateSelectedImage = (e) => {
        setSelectedImage(e.target.dataset.item)
    }

    return post ? <div className='w-full md:w-180 mt-10'>

        <header>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className='flex flex-row items-center justify-between mb-4 opacity-70'>
                <p>{post.role} &middot; {dateCreated}</p>
            </div>

            <p>{post.intro}</p>
        </header>

        <section className='flex flex-col gap-2'>
            <div className=''>
                <img src={import.meta.env.VITE_SERVER_URL + 'images/' + (selectedImage)} alt="" title="" draggable="false" className='w-full h-100 rounded object-cover' />
            </div>
            <div className='flex flex-row gap-2 mb-4 md:mb-0'>
                {post.images.length > 1 ? parseImages.map((item, key) => { if (key < 5) return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + item} alt="" title="" draggable="false" onClick={ updateSelectedImage } data-item={item} className={`cursor-pointer w-10 h-10 object-cover rounded border-[#555] ${item === selectedImage ? 'border' : ''}`} key={key} /> }) : null}
            </div>
        </section>

        <section>
            <h2>Tools Used:</h2>
            {post.toolsUsed ? JSON.parse(post.toolsUsed).map((item, key) => {
                return <div key={key}>{icons[item]}</div>
            }) : null}
        </section>

        <section>
            {post.timeline ? JSON.parse(post.timeline).map((item, key) => {
                return <div className="flex flex-col" key={key}>
                    <span>{item.date}</span>
                    <span>{item.title}</span>
                    <span>{item.descriptor}</span>
                </div>
            }) : null}
        </section>

        <section>
            {post.skillsApplied ? JSON.parse(post.skillsApplied).map((item, key) => {
                return <div key={key}>
                    <span>{item.skill}</span>
                </div>
            }) : null}
        </section>

        <section>
            {post.keyTasks ? JSON.parse(post.keyTasks).map((item, key) => {
                return <div key={key}>
                    <span>{item.task}</span>
                </div>
            }) : null}
        </section>

        <section>
            {post.challenges ? JSON.parse(post.challenges).map((item, key) => {
                return <div key={key}>
                    <span>{item.challenge}</span>
                    <span>{item.solution}</span>
                </div>
            }) : null}
        </section>

        <section>
            <h2>Takeaways:</h2>
            {post.takeaways ? JSON.parse(post.takeaways).map((item, key) => {
                return <div key={key}>
                    <span>{item.takeaway}</span>
                </div>
            }) : null}
        </section>

        <section>
            {post.solutionSummary}
        </section>

        <section>
            <div className='flex flex-row gap-8 items-center'>
                {post.githubURL ? <a href={post.githubURL} title={post.title + ' GitHub Link'} target="_blank" rel="noreferrer"><FaGithub size={26} /></a> : null }
                {post.projectSite ? <a href={post.projectSite} title={post.title + ' Project Link'} target="_blank" rel="noreferrer"><FaLink size={26} /></a> : null}
            </div>
        </section>

        <section className="mt-8 mb-4 flex justify-center">
            <Link to="/portfolio" className='flex flex-row gap-2 items-center'><FaArrowAltCircleLeft size={20}/> Back to Portfolio</Link>
        </section>

    </div> : <>
        <span class="loader"></span>
    </>
}

export default PortfolioSingle;