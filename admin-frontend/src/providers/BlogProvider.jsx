import { useState, useEffect, createContext } from 'react';

export const BlogContext = createContext(null);

function BlogProvider({ children }) {

    const [blogItems, setBlogItems] = useState([]);

    useEffect(() => {

        // Yes I know that I keep making these functions.
        // I would rather undo that.

        const makeFetch = async () => {
            const response = await fetch(import.meta.env.VITE_SERVER_URL + 'api/v1/blog', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) return [];

            const data = await response.json();

            if (data.error) return [];

            return data;
        }

        const doFetch = async () => {
            const response = await makeFetch();

            console.log(response);

            setBlogItems(response);
        }

        doFetch();

    }, []);

    return <BlogContext.Provider value={ blogItems }>
        { children }
    </BlogContext.Provider>
}

export default BlogProvider;