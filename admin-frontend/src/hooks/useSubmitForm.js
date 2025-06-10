import { useState } from 'react';

function useSubmitForm({ url, isUpdate, setIsUpdate }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitForm = async (form, formOrig) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
        if (key === 'files') return;

        if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === 'object' && 'value' in value[0]) {
            formData.append(key, JSON.stringify(value.map(item => item.value)));
            } else {
            formData.append(key, JSON.stringify(value));
            }
        } else if (typeof value === 'object' && value !== null) {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, value);
        }
        });

        // Append files
        // We check for 'images' above because I thought for a while that maybe...just maybe, we were getting images as our key in random cases
        // I don't believe this is still true so I'm going to remove it and see what happens.
        // Great no difference in functionality!
        if (formOrig?.files !== form.files) {
            form.files.forEach(item => formData.append('files', item));
        } else {
            form.files.forEach(item => formData.append('files', item.value));
        }

        if (isUpdate) {
            formData.append('id', isUpdate);
        }

        try {
            const res = await fetch(url, {
                method: isUpdate ? 'PUT' : 'POST',
                body: formData,
                credentials: 'include',
            });

            const data = await res.json();

            if (data.error) {
                setError(data.error);
                setLoading(false);
                return false;
            }

            setLoading(false);
            setIsUpdate(data.data.id || false);

            console.log(data);

            return data.data;
        } catch (err) {
            setError(err.message || 'Unknown error');
            setLoading(false);
            return false;
        }
    }

    return { 
        submitForm, 
        loading, 
        error 
    };
}

export default useSubmitForm;