import { useState } from 'react';
import CMSInput from './CMSInput';
import ToolsUsed from './toolsUsed';

const formOrig = {
    title: '',
    intro: '',
    role: '',
    timeline: [],
    toolsUsed: [],
    skillsApplied: [],
    keyTasks: [],
    challenges: [],
    takeaways: [],
    solutionSummary: '',
    githubURL: '',
    projectSite: '',
    files: []
}

function PortfolioForm() {

    const [form, setForm] = useState(formOrig);

    const handleChange = (e) => {
        const { name, value, id } = e.target;
        setForm(prev => {
        if (Array.isArray(prev[name])) {
            return {
            ...prev,
            [name]: prev[name].map(item =>
                item.id === id ? { ...item, value } : item
            )
            };
        } else {
            return { ...prev, [name]: value };
        }
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const { name } = e.target;

        const lengthOfArray = form[name].length;
        const newId = `${name}${lengthOfArray}`;

        setForm(prev => ({
        ...prev,
        [name]: [
            ...prev[name],
            { id: newId, value: '' }
        ]
        }));
    };

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
    }

    const handleFileChange = (e) => {
        console.log(e.target.files);
        setForm(prev => ({ 
            ...prev, 
            files: e.target.files 
        }));
    };

   const submitPortfolioEntry = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (key === 'files') return; // skip files for now

            if (Array.isArray(value)) {
                // Check if array items are objects with a `value` property
                if (value.length > 0 && typeof value[0] === 'object' && 'value' in value[0]) {
                    const simplifiedArray = value.map(item => item.value);
                    formData.append(key, JSON.stringify(simplifiedArray));
                } else {
                    // Already flat array of strings/numbers
                    formData.append(key, JSON.stringify(value));
                }
            } else if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        // Append files individually
        for (let i = 0; i < form.files.length; i++) {
            formData.append('files', form.files[i]);
        }

        // Debug print to verify final structure
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const res = await fetch('http://localhost:3000/api/v1/portfolio/', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await res.json();
            console.log(data);
            setForm(formOrig);
        } catch (error) {
            console.error('Submission error:', error);
        }
    }


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

        console.log(form);
    };



    return <form onSubmit={submitPortfolioEntry} encType="multipart/form-data" className='flex flex-col w-180 bg-[#222] p-8'>

            <div className="flex flex-row flex-wrap gap-4">
                <label htmlFor="title" className="flex flex-col flex-grow-1">
                    <span>Title:</span>
                    <input type="text" name="title" id="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                </label>     

                <label htmlFor="role" className="flex flex-col flex-grow-1">
                    <span>Role:</span>
                    <input type="text" name="role" id="role" placeholder="Role" value={form.role} onChange={handleChange} required />
                </label>

                <label htmlFor="githubURL" className="flex flex-col flex-grow-1">
                    <span>GitHub URL:</span>
                    <input type="url" name="githubURL" id="githubURL" placeholder="GitHub URL" value={form.githubURL} onChange={handleChange} maxLength={1000} />
                </label>  

                <label htmlFor="projectSite" className="flex flex-col flex-grow-1">
                    <span>Site URL (or YouTube video):</span>
                    <input type="url" name="projectSite" id="projectSite" placeholder="Project Site" value={form.projectSite} onChange={handleChange} maxLength={1000} />
                </label>  
            </div>

            <label htmlFor="files">
                Files:
                <input type="file" name="files" id="files" multiple onChange={handleFileChange} className='cursor-pointer' />
            </label>

            <label htmlFor="intro" className="flex flex-col">
                <span>Intro:</span>
                <textarea type="text" name="intro" id="intro" placeholder="Intro" value={form.intro} onChange={handleChange} required></textarea>
            </label>

            <label htmlFor="solutionSummary" className="flex flex-col">
                <span>Solution Summary:</span>
                <textarea name="solutionSummary" id="solutionSummary" placeholder="Solution Summary" value={form.solutionSummary} onChange={handleChange} maxLength={255} className="h-[80px]"></textarea>
            </label>  

            <ToolsUsed handleCheckboxUpdate={handleCheckboxUpdate} />

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Skills Applied" sectionName="skillsApplied" form={form}/>

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Key Tasks" sectionName="keyTasks" form={form}/>

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Timeline" sectionName="timeline" form={form}/>

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Challenge and Solution" sectionName="challenges" form={form}/>

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Takeaways" sectionName="takeaways" form={form}/>

            <input type="submit" value="Submit" className="cursor-pointer bg-green-500 rounded-[8px]" />
        </form>
}

export default PortfolioForm;