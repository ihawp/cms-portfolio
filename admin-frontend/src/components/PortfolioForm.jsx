import { useContext } from 'react';
import ToolsUsed from './toolsUsed';
import { PortfolioContext } from '../providers/PortfolioProvider';
import MultiInput from './MultiInput';
import { useFormState } from '../hooks/useFormState';

function PortfolioForm({ formOrig, isUpdate, setIsUpdate, setUpdateForm }) {

    const { setPortfolioItems } = useContext(PortfolioContext);

    const { 
        form,
        handleChange,
        handleFileChange,
        handleCheckboxUpdate,
        handleAdd,
        handleRemove,
        handleClear,
        resetForm
    } = useFormState(formOrig);

   const submitPortfolioEntry = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (key === 'files' || key === 'images') return; // skip files for now

            if (Array.isArray(value)) {
                // Check if array items are objects with a `value` property
                if (value.length > 0 && typeof value[0] === 'object' && 'value' in value[0]) {
                    const simplifiedArray = value.map(item => item.value);
                    formData.append(key, JSON.stringify(simplifiedArray));
                } else {
                    formData.append(key, JSON.stringify(value));
                }
            } else if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        // Append files individually
        if (formOrig.files !== form.files) {
            form.files.forEach(item => {
                formData.append('files', item);
            });
        } else {
            form.files.forEach(item => {
                formData.append('files', item.value);
            });
        }

        // Debug print to verify final structure
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        if (isUpdate) {
            formData.append('id', isUpdate);
        }

        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + 'api/v1/portfolio/', {
                method: isUpdate ? 'PUT' : 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await res.json();

            console.log(data);
            console.log(isUpdate ? 'PUT' : 'POST');

            if (data.error) return false;

            console.log(data.data);

            setUpdateForm(data.data);

            const jsonFields = [
                'challenges',
                'images',
                'keyTasks',
                'skillsApplied',
                'takeaways',
                'timeline',
                'toolsUsed',
                'files'
            ];

            // replace or add data depending on if it was a post update
            // or not.

            const stringifiedData = { ...data.data };

            jsonFields.forEach((field) => {
                if (Array.isArray(stringifiedData[field]) || typeof stringifiedData[field] === 'object') {
                    stringifiedData[field] = JSON.stringify(stringifiedData[field]);
                }
            });

            console.log(stringifiedData);

            setPortfolioItems(prev => {
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

            // should add returned 'post' to portfolioItems with setPortfolioItems()
            // so that it is immediatley visible in the portfolio table.
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return <form onSubmit={submitPortfolioEntry} encType="multipart/form-data" className='flex flex-col w-180 bg-[#222] p-8 rounded-[8px]'>

        <h3 className="mb-12 text-2xl text-center max-w-200">{form.title || "Title"}</h3>

        <div className="flex flex-row flex-wrap mb-8 gap-8">

                <label htmlFor="title" className="flex flex-col max-w-[50%] flex-grow-1">
                    <span className='text-xs mb-2'>Title:</span>
                    <input type="text" name="title" id="title" placeholder="Title" value={form.title} onChange={handleChange} maxLength={255} required className="border-solid border border-gray-500 rounded-lg px-3 py-2" />
                </label>

                <label htmlFor="role" className="flex flex-col max-w-[50%] flex-grow-1">
                    <span className='text-xs mb-2'>Role:</span>
                    <input type="text" name="role" id="role" placeholder="Role" value={form.role} onChange={handleChange} maxLength={255}required className="border-solid border border-gray-500 rounded-lg px-3 py-2" />
                </label>

                <label htmlFor="githubURL" className="flex flex-col max-w-[50%] flex-grow-1">
                    <span className='text-xs mb-2'>GitHub URL:</span>
                    <input type="url" name="githubURL" id="githubURL" placeholder="GitHub URL" value={form.githubURL} onChange={handleChange} maxLength={1000} className="border-solid border border-gray-500 rounded-lg px-3 py-2" />
                </label>

                <label htmlFor="projectSite" className="flex flex-col max-w-[50%] flex-grow-1">
                    <span className='text-xs mb-2'>Site URL (or YouTube video):</span>
                    <input type="url" name="projectSite" id="projectSite" placeholder="Project Site" value={form.projectSite} onChange={handleChange} maxLength={1000} className="border-solid border border-gray-500 rounded-lg px-3 py-2" />
                </label>
        </div>

        <label htmlFor="intro" className="flex flex-col mb-8">
                <span className='text-xs mb-2'>Intro:</span>
                <textarea type="text" name="intro" id="intro" placeholder="Intro" value={form.intro} onChange={handleChange} maxLength={255} className="h-[140px] border-solid border border-gray-500 rounded-lg px-3 py-2" required></textarea>
        </label>

        <label htmlFor="solutionSummary" className="flex flex-col mb-8">
                <span className='text-xs mb-2'>Solution Summary:</span>
                <textarea name="solutionSummary" id="solutionSummary" placeholder="Solution Summary" value={form.solutionSummary} onChange={handleChange} maxLength={1000} className="h-[140px] border-solid border border-gray-500 rounded-lg px-3 py-2" ></textarea>
        </label>

        <label htmlFor="files" className="relative mb-8">
                <span hidden>Files:</span>
                <input type="file" name="files" id="files" multiple onChange={handleFileChange} className='w-full h-[100px]' />
                <div className="absolute top-0 left-0 w-full h-full cursor-pointer flex justify-center items-center rounded-lg gap-4 bg-[#222] border-dashed border-gray-500 border text-white">
                    {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                    {form.files.length === 0 ? <>
                        <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M128 64c0-35.3 28.7-64 64-64L352 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-112 174.1 0-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39L128 288l0-224zm0 224l0 48L24 336c-13.3 0-24-10.7-24-24s10.7-24 24-24l104 0zM512 128l-128 0L384 0 512 128z" /></svg>
                        <span className="text-xl">Upload Media</span>
                    </> : <div className="flex flex-col text-center">
                        <span className="text-xl">{form.files.length} Files Uploaded</span>
                        <span>Press anywhere to change the uploaded files.</span>
                    </div> }
                </div>
        </label>

        {/* has `mb-8` in its wrapper */}
        <ToolsUsed handleCheckboxUpdate={handleCheckboxUpdate} selectedTools={form.toolsUsed} />

        <div className="flex flex-col gap-4 mb-8">
                <MultiInput dataTypes={["skill"]} handleAdd={(e) => handleAdd(e, { skill: '' })} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Skills Applied" sectionTitleSingle="Skill Applied" sectionName="skillsApplied" form={form}/>

                <MultiInput dataTypes={["task"]} handleAdd={(e) => handleAdd(e, { task: '' })} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Key Tasks" sectionTitleSingle="Key Task" sectionName="keyTasks" form={form}/>

                <MultiInput dataTypes={["date", "title", "descriptor"]} handleAdd={(e) => handleAdd(e, { date: '', title: '', descriptor: '' })} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Timeline" sectionName="timeline" form={form}/>

                <MultiInput dataTypes={["challenge", "solution"]} handleAdd={(e) => handleAdd(e, { challenge: '', solution: '' })} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Challenge and Solution" sectionName="challenges" form={form}/>

                <MultiInput dataTypes={["takeaway"]} handleAdd={(e) => handleAdd(e, { takeaway: '' })} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Takeaways" sectionTitleSingle="Takeaway" sectionName="takeaways" form={form}/>
        </div>

        <div className="flex flex-row gap-2">
                <input type="button" value="Reset" onClick={resetForm} className="w-[200px] cursor-pointer hover:bg-red-500 border-red-500 border rounded-lg h-[40px]" />
                <input type="submit" value="Submit" className="w-full cursor-pointer bg-green-600 rounded-lg h-[40px]" />
        </div>
    </form>
}

export default PortfolioForm;