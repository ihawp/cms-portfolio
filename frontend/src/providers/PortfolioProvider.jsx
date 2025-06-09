import { useState, useEffect, createContext } from 'react';

export const PortfolioContext = createContext(null);

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

                console.log(response);

                if (!response.ok) return false;

                const data = await response.json();

                console.log(data);

                if (data.error) return false;

                console.log(data);

                return data.data.response;
            } catch (error) {
                return false;
            }
        }

        const doFetch = async () => {
            const response = await makeFetch();
            setPosts(response || []);
        }

        doFetch();

    }, []);

    return <PortfolioContext.Provider value={{ posts }}>
        { children }
    </PortfolioContext.Provider>
}

export default PortfolioProvider;