function ToolsUsedItem({ handleCheckboxUpdate, name }) {
    return <label htmlFor="toolsUsed">
        {name}
        <input type="checkbox" name="toolsUsed" value={name} onChange={handleCheckboxUpdate} />
    </label>
}

export default ToolsUsedItem;