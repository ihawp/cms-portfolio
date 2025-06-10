import { useState } from 'react';

const useReturnedData = ({ jsonFields, setItems, setIsUpdate }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateRecord = (data) => {

        setLoading(true);
        setError(null);
        try {

            // Replace or add data depending on if it was a post update or not.
            const stringifiedData = { ...data };

            console.log(stringifiedData);

            jsonFields.forEach((field) => {

                console.log(field);

                console.log(stringifiedData[field]);

                if (Array.isArray(stringifiedData[field]) || typeof stringifiedData[field] === 'object') {
                    
                    stringifiedData[field] = JSON.stringify(stringifiedData[field]);
                }
            });

            console.log(stringifiedData);

            setItems(prev => {
                const index = prev.findIndex(item => item.id == stringifiedData.id);
                if (index !== -1) {
                    const updated = [...prev];
                    updated[index] = stringifiedData;
                    return updated;
                } else {
                    return [...prev, stringifiedData];
                }
            });

            setIsUpdate(stringifiedData.id);
            setLoading(false);
            return true;
        } catch (error) {
            console.log(error);
            setError('Unknown error when formatting post data.');
            setLoading(false);
            return false;
        }
    }

    return {
        updateRecord,
    };
}

export default useReturnedData;