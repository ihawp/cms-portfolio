import { useContext } from 'react';
import ToolsUsed from './toolsUsed';
import { PortfolioContext } from '../providers/PortfolioProvider';
import MultiInput from './MultiInput';
import { useFormState } from '../hooks/useFormState';
import useSubmitForm from '../hooks/useSubmitForm';
import useReturnedData from '../hooks/useReturnedData';

function PortfolioForm({ formOrig, isUpdate, setIsUpdate, setUpdateForm }) {

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

    const { setPortfolioItems } = useContext(PortfolioContext);

    const { submitForm, loading, error } = useSubmitForm({
        url: import.meta.env.VITE_SERVER_URL + 'api/v1/portfolio/',
        isUpdate,
        setIsUpdate
    });

    const { updateRecord } = useReturnedData({
        jsonFields,
        setPortfolioItems,
        setIsUpdate
    });

    // This could get loaded once
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

    // even all this below could be reused!
    // Could create global form object that data is passed too, but I want the form to stay kind of seperate, I just wanted to logic to be reusable
    // And I want the custom layout for the specific forms... I suppose I could create data structure that is read by the component to display inputs
    // in a certain manor... I will try this later when I have more time.

    // So now I will move to adding a blog table / form with this current structure
    // but before that I need to create a blog table in the DB
    // insert some example content
    // finish the Express routes.

    const submitPortfolioEntry = async (e) => {
        e.preventDefault();
        
        const data = await submitForm(form, formOrig);
        
        if (!data) return false;

        setUpdateForm(data);

        updateRecord(data);
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