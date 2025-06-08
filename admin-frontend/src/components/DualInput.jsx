function DualInput({ handleAdd, handleClear, handleRemove, handleChange, sectionTitle, sectionName, form, dataTypes }) {
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
                return <div className='flex flex-row items-center mt-2' key={key}>

                    <div className="flex flex-col w-full gap-1">
                    {/* Challenge */}
                        <input 
                            name={sectionName}
                            onChange={handleChange} 
                            id={item.id} 
                            className="border border-gray-400 px-3 py-2 rounded-lg" 
                            type="text" 
                            data-type={dataTypes[0]}
                            value={item.challenge} 
                            placeholder="Challenge" 
                        />
                        
                        {/* Solution */}
                        <textarea 
                            name={sectionName} 
                            onChange={handleChange} 
                            id={item.id} 
                            className="border border-gray-400 px-3 py-2 rounded-lg" 
                            type="text" 
                            data-type={dataTypes[1]}
                            value={item.solution} 
                            placeholder="Solution" 
                        ></textarea>
                    </div>
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

export default DualInput;