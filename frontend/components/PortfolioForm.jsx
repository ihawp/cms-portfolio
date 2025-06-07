import { useState } from 'react';

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
        }))
    }

    const handleFileChange = (e) => {
        setForm(prev => ({ ...prev, files: e.target.files }));
    };

    const submitPortfolioEntry = async (event) => {
        event.preventDefault();

        console.log(form);

        const formData = new FormData();

        /*
        // Append all non-file fields
        Object.entries(form).forEach(([key, value]) => {
        if (key === 'files') return;
        formData.append(key, value);
        });

        // Append files from form.files
        for (let i = 0; i < form.files.length; i++) {
        formData.append('files', form.files[i]);
        }
        */
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

    // the form needs to be dynamically generatable
    // I need to be able to click add new key task so that I may have another array entry..?
    // I believe that is the most straightforward option, it would be less ideal to spend time splitting by commas (,) 
    // and having extra formatting, multiple text box values added to array seems reasonable

    return <form onSubmit={submitPortfolioEntry} encType="multipart/form-data" className='flex flex-col w-180'>
            <input type="text" name="title" id="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <input type="text" name="intro" id="intro" placeholder="Intro" value={form.intro} onChange={handleChange} required />
            <input type="text" name="role" id="role" placeholder="Role" value={form.role} onChange={handleChange} />
            <textarea name="timeline" id="timeline" placeholder="Timeline" value={form.timeline} onChange={handleChange}></textarea>
            <textarea name="toolsUsed" id="toolsUsed" placeholder="Tools Used" value={form.toolsUsed} onChange={handleChange}></textarea>

            <div aria-label="Add Skills Applied Section" className="flex flex-col bg-[#222] bw-1 bs-solid my-12 p-4 rounded-[8px]">

                <div className="flex flex-row items-center justify-between">

                    <h2 className="text-xl">Skills Applied</h2>

                    <div className="flex flex-row gap-2">
                        <button className="w-max p-2 bg-green-700 cursor-pointer rounded" type="button" onClick={handleAdd} name="skillsApplied" value="skillsApplied">
                            + Add
                        </button>
                        <button className="w-max p-2 bg-red-600 cursor-pointer rounded" type="button" onClick={handleClear} name="skillsApplied" value="skillsApplied">
                            X Clear All
                        </button>
                    </div>
                </div>
                
                <div className="my-4">
                    {form.skillsApplied.length > 0 ? form.skillsApplied.map((item, key) => {
                        return <div className="flex flex-row items-center mt-2">
                            <textarea className='p-1 w-full h-[84px]'
                                key={item.id} // Use item.id as the key
                                name="skillsApplied"
                                id={item.id} // Unique id for each input
                                placeholder="Skills Applied"
                                value={item.value} // Bind to the value of the object in the array
                                onChange={handleChange} // Handle the change for this specific item
                                maxLength={255}
                            ></textarea>
                            <button 
                                type="button"
                                name="skillsApplied"
                                onClick={(e) => handleRemove(e, item.id)}
                                className="bg-red-600 cursor-pointer rounded-[8px] p-2 h-max w-[130px] ml-6"
                            >
                                - Remove
                            </button>
                        </div>
                    }) : null}
                </div>
            </div>

            <textarea name="keyTasks" id="keyTasks" placeholder="Key Tasks" value={form.keyTasks} onChange={handleChange}></textarea>
            <textarea name="challenges" id="challenges" placeholder="Challenges" value={form.challenges} onChange={handleChange}></textarea>
            <textarea name="takeaways" id="takeaways" placeholder="Takeaways" value={form.takeaways} onChange={handleChange}></textarea>
            <textarea name="solutionSummary" id="solutionSummary" placeholder="Solution Summary" value={form.solutionSummary} onChange={handleChange}></textarea>
            <input type="url" name="githubURL" id="githubURL" placeholder="GitHub URL" value={form.githubURL} onChange={handleChange} />
            <input type="url" name="projectSite" id="projectSite" placeholder="Project Site" value={form.projectSite} onChange={handleChange} />

            <input type="file" name="files" id="files" multiple onChange={handleFileChange} />

            <input type="submit" value="Submit" />
        </form>
}

export default PortfolioForm;