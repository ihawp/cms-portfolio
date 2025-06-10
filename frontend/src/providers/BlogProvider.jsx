import { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext(null);

function BlogProvider({ children }) {

    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {

        const makeFetch = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_SERVER_URL + 'api/v1/blog', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) return false;

                const data = await response.json();

                if (data.error) return false;

                return data.data.response;

            } catch (error) {
                return false;
            }
        }

        const doFetch = async () => {
            const response = await makeFetch();
            setBlogPosts(response || []);
        }

        doFetch();

    }, []);

    return <BlogContext.Provider value={{ blogPosts }}>
        { children }
    </BlogContext.Provider>

}

export default BlogProvider;