import { useState, useEffect, createContext } from 'react';

export const PortfolioContext = createContext(null);

const rows = [
    'timeline',
    'toolsUsed',
    'skillsApplied',
    'keyTasks',
    'challenges',
    'takeaways',
    'images'
];

function PortfolioProvider({ children }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const makeFetch = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_SERVER_URL + 'api/v1/portfolio', {
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

            if (!response) return false;

            const parsedResponse = response.map(post => {
                const newPost = { ...post };

                rows.forEach(key => {
                if (newPost[key]) {
                    try {
                    newPost[key] = JSON.parse(newPost[key]);
                    } catch (e) {
                    console.warn(`Failed to parse ${key} in post ${post.id}`, e);
                    }
                }
                });

                return newPost;
            });

            setPosts(parsedResponse);
        }

        doFetch();

    }, []);

    return <PortfolioContext.Provider value={{ posts }}>
        { children }
    </PortfolioContext.Provider>
}

export default PortfolioProvider;