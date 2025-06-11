import { useContext } from "react";
import { BlogContext } from "../providers/BlogProvider";
import BlogItem from '../components/BlogItem';

function Blog() {

    const { blogPosts } = useContext(BlogContext);

    return <div className="w-full md:w-190 xl:w-300">
    
        <header>
            <h1>Blog</h1>
        </header>

        {blogPosts ? blogPosts.map((item, key) => {
            return <BlogItem item={ item } key={ key } />
        }) : null}
    
    </div>
}

export default Blog;