import { useContext } from 'react';
import { BlogContext } from '../providers/BlogProvider';
import MultiInput from './MultiInput';
import { useFormState } from '../hooks/useFormState';
import useSubmitForm from '../hooks/useSubmitForm';
import useReturnedData from '../hooks/useReturnedData';

function BlogForm({ formOrig, isUpdate, setIsUpdate, setUpdateForm }) {

    const jsonFields = [
        'content',
        'tags',
        'files'
    ];

    const { setBlogItems } = useContext(BlogContext);

    const { submitForm, loading, error } = useSubmitForm({
        url: import.meta.env.VITE_SERVER_URL + 'api/v1/blog/',
        isUpdate,
        setIsUpdate
    });

    const { updateRecord } = useReturnedData({
        jsonFields,
        setBlogItems,
        setIsUpdate
    });

    const { 
        form,
        handleChange,
        handleFileChange,
        handleAdd,
        handleRemove,
        handleClear,
        resetForm
    } = useFormState(formOrig);

    const submitBlogEntry = async (e) => {
        e.preventDefault();
        
        const data = await submitForm(form, formOrig);
        
        if (!data) return false;

        setUpdateForm(data);

        updateRecord(data);
    }

    return <form onSubmit={submitBlogEntry} encType="multipart/form-data" className='flex flex-col w-180 bg-[#222] p-8 rounded-[8px]'>

        <h3 className="mb-12 text-2xl text-center max-w-200">{form.title || "Title"}</h3>

        <div className="flex flex-row flex-wrap mb-8 gap-8">

                <label htmlFor="title" className="flex flex-col max-w-[50%] flex-grow-1">
                    <span className='text-xs mb-2'>Title:</span>
                    <input type="text" name="title" id="title" placeholder="Title" value={form.title} onChange={handleChange} maxLength={255} required className="border-solid border border-gray-500 rounded-lg px-3 py-2" />
                </label>

                <label htmlFor="author" className="flex flex-col max-w-[50%] flex-grow-1">
                    <span className='text-xs mb-2'>Author:</span>
                    <input type="text" name="author" id="author" placeholder="Author" value={form.author} onChange={handleChange} maxLength={255} required className="border-solid border border-gray-500 rounded-lg px-3 py-2" />
                </label>

        </div>

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

        <div className="flex flex-col gap-4 mb-8">
                <MultiInput dataTypes={["content"]} handleAdd={(e) => handleAdd(e, { content: '' })} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Contents" sectionTitleSingle="Content" sectionName="content" form={form}/>

                <MultiInput dataTypes={["tags"]} handleAdd={(e) => handleAdd(e, { tags: '' })} handleChange={handleChange} handleClear={handleClear} handleRemove={handleRemove} sectionTitle="Tags" sectionTitleSingle="Tag" sectionName="tags" form={form}/>
        </div>

        <div className="flex flex-row gap-2">
                <input type="button" value="Reset" onClick={resetForm} className="w-[200px] cursor-pointer hover:bg-red-500 border-red-500 border rounded-lg h-[40px]" />
                <input type="submit" value="Submit" className="w-full cursor-pointer bg-green-600 rounded-lg h-[40px]" />
        </div>
    </form>
}

export default BlogForm;