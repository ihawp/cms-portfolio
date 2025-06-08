import { FaReact, FaNodeJs, FaJsSquare, FaHtml5, FaCss3Alt, FaWordpress, FaPhp } from 'react-icons/fa';

const icons = {
  faReact: <FaReact size={32} />,
  faNodeJs: <FaNodeJs size={32} />,
  faJSSquare: <FaJsSquare size={32} />,
  faHtml5: <FaHtml5 size={32} />,
  faCss3Alt: <FaCss3Alt size={32} />,
  faWordpress: <FaWordpress size={32} />,
  faPhp: <FaPhp size={32} />
};

function ToolsUsedItem({ handleCheckboxUpdate, name, selected }) {
  const icon = icons[name];

  return <>
    <label
      className={`w-14 h-14 flex items-center justify-center border rounded cursor-pointer transition ${
        selected ? 'border-green-500 bg-green-600' : 'border-gray-500'
      }`}
    >
      <input
        type="checkbox"
        name="toolsUsed"
        value={name}
        onChange={handleCheckboxUpdate}
        className="hidden"
        checked={selected}
      />
      {icon}
    </label>
  </>
}

export default ToolsUsedItem;