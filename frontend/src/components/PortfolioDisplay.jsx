import { useEffect, useState } from 'react';

function PortfolioDisplay() {

    const [portfolioItems, setPortfolioItems] = useState([]);

    const deleteItem = async (e, id) => {

        e.preventDefault();

        console.log(id);

        try {
            const response = await fetch(`http://localhost:3000/api/v1/portfolio/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) return false;

            const data = await response.json();

            if (data.error) return false;

            console.log(data);
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {

        const makeFetch = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/portfolio', {
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
            setPortfolioItems(response);
        }

        doFetch();

    }, []);

    return <>

        {portfolioItems.map((item, key) => {
            return <>
                <a onClick={(e) => deleteItem(e, item.id)}>Delete {item.id}</a>
            </>
        })}
        This is the portfolio display.
    </>
}

export default PortfolioDisplay;