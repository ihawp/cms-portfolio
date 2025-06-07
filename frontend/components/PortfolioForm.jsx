import { useState } from 'react';
import CMSInput from './CMSInput';

function PortfolioForm() {

    const [form, setForm] = useState({
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
    });

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
            if (typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            } else if (key !== 'files') {
                formData.append(key, value);
            }
        });

        for (let i = 0; i < form.files.length; i++) {
            formData.append('files', form.files[i]);
        }

        try {
            const response = await fetch('http://localhost:3000/api/v1/portfolio/', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return <form onSubmit={submitPortfolioEntry} encType="multipart/form-data" className='flex flex-col w-180'>
            <input type="text" name="title" id="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <input type="text" name="intro" id="intro" placeholder="Intro" value={form.intro} onChange={handleChange} required />
            <input type="text" name="role" id="role" placeholder="Role" value={form.role} onChange={handleChange} />

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Skills Applied" sectionName="skillsApplied" form={form}/>

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Key Tasks" sectionName="keyTasks" form={form}/>

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Tools Used" sectionName="toolsUsed" form={form}/>

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Timeline" sectionName="timeline" form={form}/>

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Challenges" sectionName="challenges" form={form}/>

            <CMSInput handleAdd={handleAdd} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Takeaways" sectionName="takeaways" form={form}/>

            <textarea name="solutionSummary" id="solutionSummary" placeholder="Solution Summary" value={form.solutionSummary} onChange={handleChange}></textarea>
            <input type="url" name="githubURL" id="githubURL" placeholder="GitHub URL" value={form.githubURL} onChange={handleChange} />
            <input type="url" name="projectSite" id="projectSite" placeholder="Project Site" value={form.projectSite} onChange={handleChange} />

            <input type="file" name="files" id="files" multiple onChange={handleFileChange} />

            <input type="submit" value="Submit" className="cursor-pointer" />
        </form>
}

export default PortfolioForm;