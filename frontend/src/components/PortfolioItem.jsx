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

function PortfolioItem({ item }) {
    return <div className="max-w-40">

        <p>{item.id}</p>

        <h2>{item.title}</h2>

        {item.images ? JSON.parse(item.images).map((item, key) => {
            return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + item} key={key} alt="" title="" draggable="false" />
        }) : null}

        {item.toolsUsed ? JSON.parse(item.toolsUsed).map((item, key) => {
            return <p>{icons[item]}</p>;
        }) : null}
    </div>
}

export default PortfolioItem;