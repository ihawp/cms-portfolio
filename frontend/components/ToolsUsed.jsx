import ToolsUsedItem from "./ToolsUsedItem";

function ToolsUsed({ handleCheckboxUpdate, selectedTools }) {
    const tools = [
        'faReact', 
        'faNodeJs', 
        'faJSSquare', 
        'faHtml5', 
        'faCss3Alt',
        'faWordpress',
        'faPhp',
    ];

    return (
        <div className="flex flex-col mb-8 gap-4">
            <h3>Tools Used:</h3>
            <div className="flex flex-wrap gap-2">
                {tools.map(tool => (
                    <ToolsUsedItem
                    key={tool}
                    name={tool}
                    selected={selectedTools.includes(tool)}
                    handleCheckboxUpdate={handleCheckboxUpdate}
                    />
                ))}
            </div>
        </div>
    );
}

export default ToolsUsed;