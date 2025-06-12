import formatDate from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

function BlogItem({ item }) {

    const navigate = useNavigate();

    const intro = item.content[0].content.slice(0, 155);
    const image = item.files[0];
    console.log(item.files[0]);

    return <div className="w-full bg-[#333] border border-[#555] rounded p-2 sm:p-4">

        { item.files ? <div>
            <img src={import.meta.env.VITE_SERVER_URL + 'images/' + image} alt="" title="" draggable="false" />
        </div> : null }

        <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>

        <p className="text-sm opacity-70 mb-3">{item.author} &middot; {formatDate(item.date_created)}</p>

        <p>{intro}</p>

        <div className='flex flex-row gap-8 items-center justify-between md:justify-start'>
            <button onClick={() => navigate('/blog/' + encodeURIComponent(item.id))} className='border border-[#555] md:border-none md:w-max rounded cursor-pointer w-full py-2' title={`Learn more about the ${item.title} project`}>Learn More</button>
        </div>
    </div>
}

export default BlogItem;