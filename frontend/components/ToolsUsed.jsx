import ToolsUsedItem from "./ToolsUsedItem";

function ToolsUsed({ handleCheckboxUpdate }) {

    return <>
        <ToolsUsedItem name="faReact" handleCheckboxUpdate={handleCheckboxUpdate} />
        <ToolsUsedItem name="faNodeJs" handleCheckboxUpdate={handleCheckboxUpdate} />
        <ToolsUsedItem name="faJSSquare" handleCheckboxUpdate={handleCheckboxUpdate} />
    </>

}

export default ToolsUsed;