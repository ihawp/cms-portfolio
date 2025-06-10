// useFormState.js
import { useState } from 'react';

export const useFormState = (initialForm) => {
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        const { name, id, value, dataset } = e.target;
        const field = dataset.type;

        setForm((prevForm) => {
            const currentField = prevForm[name];

            if (Array.isArray(currentField)) {
                return {
                    ...prevForm,
                    [name]: currentField.map((item) =>
                        item.id === id
                            ? { ...item, [field || "value"]: value }
                            : item
                    ),
                };
            }

            return {
                ...prevForm,
                [name]: value,
            };
        });
    };

    const handleFileChange = (e) => {

        const selectedFiles = Array.from(e.target.files);

        const validFiles = selectedFiles.filter(file => file.type === 'image/webp');

        if (validFiles.length === 0) {
            return;
        }

        setForm(prev => ({
            ...prev,
            files: validFiles
        }));
    };

    const handleAdd = (e, template) => {
        e.preventDefault();
        const { name } = e.target;
        const dateNow = new Date().getTime();
        const newId = `${name}${dateNow}`;

        setForm(prev => ({
            ...prev,
            [name]: [
                ...prev[name],
                { id: newId, ...template }
            ]
        }));
    };

    const handleCheckboxUpdate = (e) => {
        const { name, value, checked } = e.target;

        setForm(prev => {
            const current = prev[name] || [];

            return {
                ...prev,
                [name]: checked
                ? [...current, value] // add if checked
                : current.filter(v => v !== value)
            };
        });
    };

    const resetForm = () => {
        setForm(formOrig);
    }

    const handleRemove = (e, id) => {
        e.preventDefault();
        const { name } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: prev[name].filter(item => item.id !== id)
        }));
    };

    const handleClear = (e) => {
        const { name } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: []
        }));
    };

    return {
        form,
        handleChange,
        handleFileChange,
        handleCheckboxUpdate,
        handleAdd,
        handleRemove,
        handleClear,
        resetForm
    };
};