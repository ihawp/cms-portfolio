import { useContext } from "react";
import { BlogContext } from "../providers/BlogProvider";
import BlogItem from '../components/BlogItem';
import updateDocumentTitle from '../utils/updateDocumentTitle';

function Blog() {

    updateDocumentTitle('Blog | ihawp.com');

    const { blogPosts } = useContext(BlogContext);

    return blogPosts ? <div className="w-full md:w-180 mt-10">
    
        <header className="mb-8">
            <div className="w-full md:w-180">
                <div className="w-full flex flex-col items-start">
                    <h1 className="text-4xl font-bold mb-4">Blog</h1>
                    <p className="max-w-120">A place for me to expand on my projects and learnings.</p>
                </div>
            </div>
        </header>

        <section className="flex flex-col sm:flex-row gap-4">
            {blogPosts ? blogPosts.map((item, key) => {
                return <BlogItem item={ item } key={ key } />
            }) : null}
        </section>
    
    </div> : <span className="loader"></span>;
}

export default Blog;