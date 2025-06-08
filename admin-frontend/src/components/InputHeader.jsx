function InputHeader({ handleAdd, handleClear, sectionTitle, sectionName }) {

    return <div className="flex flex-row items-center justify-between">
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
}

export default InputHeader;