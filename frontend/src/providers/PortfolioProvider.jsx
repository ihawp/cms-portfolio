import { createContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext(null);

function PortfolioProvider({ children }) {

    const [portfolioItems, setPortfolioItems] = useState([]);
    
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

                console.log(data.data.response);

                return data.data.response;
            } catch (error) {
                return false;
            }
        }

        const doFetch = async () => {
            const response = await makeFetch();
            setPortfolioItems(response || []);
        }

        doFetch();

    }, []);

    return <PortfolioContext.Provider value={{ portfolioItems, setPortfolioItems }}>
        { children }
    </PortfolioContext.Provider>
}

export default PortfolioProvider;