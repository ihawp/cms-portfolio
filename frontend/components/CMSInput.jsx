function CMSInput({ handleAdd, handleClear, handleRemove, handleChange, sectionTitle, sectionName, form }) {
    return <div className="flex flex-col bg-[#222] bw-1 bs-solid my-1 p-4 rounded-[8px]">
        <div className="flex flex-row items-center justify-between">
            <h2 className="text-xl">{sectionTitle}</h2>
            <div className="flex flex-row gap-2">
                <button className="w-max p-2 bg-green-700 cursor-pointer rounded" title={`Add a ${sectionTitle}`} type="button" onClick={handleAdd} name={sectionName} value={sectionName}>
                    + Add
                </button>
                <button className="w-max p-2 bg-red-600 cursor-pointer rounded" type="button" onClick={handleClear} name={sectionName} value={sectionName}>
                    X Clear All
                </button>
            </div>
        </div>
        
        <div className="my-4">
            {form[sectionName].length > 0 ? form[sectionName].map((item, key) => {
                return <div className="flex flex-row items-center mt-2" key={item.id}>
                    <textarea className='p-1 w-full h-[84px]'
                        name={sectionName}
                        id={item.id} // Unique id for each input
                        placeholder={sectionTitle}
                        value={item.value} // Bind to the value of the object in the array
                        onChange={handleChange} // Handle the change for this specific item
                        maxLength={255}
                    ></textarea>
                    <button 
                        type="button"
                        name={sectionName}
                        onClick={(e) => handleRemove(e, item.id)}
                        className="bg-red-600 cursor-pointer rounded-[8px] p-2 h-max w-[130px] ml-6"
                    >
                        - Remove
                    </button>
                </div>
            }) : null}
        </div>
    </div>
}

export default CMSInput;