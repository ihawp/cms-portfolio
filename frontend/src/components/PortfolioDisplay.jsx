import { useEffect, useState } from 'react';

function PortfolioDisplay() {

    const [portfolioItems, setPortfolioItems] = useState();

    useEffect(() => {

        const wowwt = async () => {
            const response = await fetch('http://localhost:3000/api/v1/portfolio', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) return false;

            const data = await response.json();

            return data;
        }

        const wowt = async () => {
            const response = await wowwt();
            console.log(response.data);
            setPortfolioItems(response);
        }

        wowt();

    }, []);

    return <>
        This is the portfolio display.
    </>
}

export default PortfolioDisplay;