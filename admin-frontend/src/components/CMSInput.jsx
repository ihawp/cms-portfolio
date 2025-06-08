function CMSInput({ handleAdd, handleClear, handleRemove, handleChange, sectionTitle, sectionTitleSingle, sectionName, form }) {
    return <div className="flex flex-col rounded-[8px]">
        <div className="flex flex-row items-center justify-between">
            <h2 className="">{sectionTitle}</h2>
            <div className="flex flex-row gap-2">
                <button className="w-max p-2 bg-green-700 cursor-pointer rounded" title={`Add a ${sectionTitle}`} type="button" onClick={handleAdd} name={sectionName} value={sectionName}>
                    + Add
                </button>
                <button className="w-max p-2 bg-red-500 cursor-pointer rounded flex gap-2" type="button" onClick={handleClear} name={sectionName} value={sectionName}>
                    Clear All
                </button>
            </div>
        </div>
        
        <div>
            {form[sectionName].length > 0 ? form[sectionName].map((item, key) => {
                return <div className="flex flex-row items-center mt-2" key={item.id}>
                    <input className='p-1 w-full border border-gray-400 rounded-lg px-3 py-2'
                        name={sectionName}
                        id={item.id} // Unique id for each input
                        placeholder={sectionTitleSingle || sectionTitle}
                        value={item.value} // Bind to the value of the object in the array
                        onChange={handleChange} // Handle the change for this specific item
                        maxLength={255}
                    />
                    <button 
                        type="button"
                        name={sectionName}
                        onClick={(e) => handleRemove(e, item.id)}
                        className="cursor-pointer rounded-lg p-2 ml-2 w-[40px] h-[40px] text-center hover:border-gray-400 border border-transparent"
                        title="Remove"
                    >
                        -
                    </button>
                </div>
            }) : null}
        </div>
    </div>
}

export default CMSInput;