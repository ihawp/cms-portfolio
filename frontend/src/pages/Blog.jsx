import { useContext } from "react";
import { BlogContext } from "../providers/BlogProvider";

function Blog() {

    const { blogPosts } = useContext(BlogContext);

    return <>
    
        <header>
            <h1>Blog</h1>
        </header>

        {blogPosts ? blogPosts.map((item, key) => {
            return <div key={key}>

                <p>{item.id}</p>

                <h2>{item.title}</h2>

                {JSON.parse(item.files).map((item, key) => {
                    return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + item} key={key} alt="ihawp.com Image" draggable="false" />
                })}
            </div>
        }) : null}
    
    </>
}

export default Blog;