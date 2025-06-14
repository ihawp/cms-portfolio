import formatDate from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

function BlogItem({ item }) {

    const navigate = useNavigate();

    return item ? <div className="flex-grow-1 sm:max-w-[calc(50%-8px)] md:max-w-[352px] bg-[#333] border border-[#555] rounded p-4">

        <div className="sm:w-full sm:aspect-square">
            <img src={import.meta.env.VITE_SERVER_URL + 'images/' + item.files[0]} alt="" title="" className="sm:w-full sm:h-full object-cover border border-[#555] rounded" draggable="false" />
        </div>

        <h2 className="text-2xl font-semibold my-4">{item.title}</h2>

        <p className="text-sm opacity-70 mb-3">{item.author} &middot; {formatDate(item.date_created)}</p>

        <p className="mb-8 sm:mb-3 sm:h-41">{item.content[0].content.slice(0, 155).trim()}...</p>

        <div className='flex flex-row gap-8 items-center justify-between md:justify-start w-full'>
            <button onClick={() => navigate('/blog/' + encodeURIComponent(item.id))} className='w-full border border-[#555] rounded cursor-pointer py-2' title={`Read more about ${item.title}`}>Read More</button>
        </div>
    </div> : <div className="loader"></div>
}

export default BlogItem;