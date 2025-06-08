import { useEffect, useState, useContext } from 'react';
import { PortfolioContext } from '../providers/PortfolioProvider';

function PortfolioDisplay() {

    const { portfolioItems, setPortfolioItems } = useContext(PortfolioContext);

    const deleteItem = async (e, id) => {

        e.preventDefault();

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