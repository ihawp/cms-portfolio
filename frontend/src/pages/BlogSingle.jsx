import copyWindowLocation from '../utils/copyWindowLocation';
import updateDocumentTitle from "../utils/updateDocumentTitle";
import { BlogContext } from '../providers/BlogProvider';
import { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import { FaShareAlt, FaArrowAltCircleLeft } from 'react-icons/fa';
import FeaturedImageDisplay from '../components/FeaturedImageDisplay';

function BlogSingle() {

    const { blogPosts } = useContext(BlogContext);

    const { id } = useParams();

    const post = blogPosts.find(item => item.id == id);

    useEffect(() => {
        if (post) {
            updateDocumentTitle(`${post.title} | ihawp.com`)
        }
    }, [post]);

    // updateDocumentTitle();

    return post ? <article className="w-full md:w-180 mt-10">

        <header className='mb-8'>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className='flex flex-row items-center flex-wrap mb-8 opacity-70 gap-2'>
                <p>{post.author}</p> &middot;
                <p>{formatDate(post.date_created)}</p>
                &middot;
                <button onClick={ copyWindowLocation } title={post.title + ' Project Link'} className='cursor-pointer'><FaShareAlt size={15} /></button>
            </div>
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

        <section>
            <div>
                {post.content.map((item, key) => {
                    return <p key={key} className='mb-8'>{item.content}</p>
                })}
            </div>
        </section>

        <section>
            <h2 className='text-sm opacity-80'>Tags</h2>
            <div className='flex flex-row flex-wrap items-center mt-4 mb-8 gap-2'>
                {post.tags.map((item, key) => {
                    return <span key={key} className='border border-[#555] bg-[#333] rounded px-2'><p className='text-xs'>{item.tags}</p></span>
                })}
            </div>
        </section>

        <section className="mt-12 mb-4 flex justify-center">
            <Link to="/blog" className='flex flex-row gap-2 items-center' title="Back to Blog Page"><FaArrowAltCircleLeft size={20}/> Back to Blog</Link>
        </section>
    </article> : <div className='loader'></div>;
}

export default BlogSingle;