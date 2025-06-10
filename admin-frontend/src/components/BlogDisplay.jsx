import { useContext } from 'react';
import { BlogContext } from '../providers/BlogProvider';
import { FaTrash } from 'react-icons/fa';
import deleteItem from '../utils/deleteItem';

function BlogDisplay({ changeUpdateForm }) {

    const { blogItems, setBlogItems } = useContext(BlogContext);

    const bcl = "px-4 border border-gray-400";

    return <table className="border border-white border-collapse rounded-lg">
        <thead>
            <tr>
                <th className={bcl}>ID</th>
                <th className={bcl}>Update</th>
                <th className={bcl}>Delete</th>
                <th className={bcl}>Title</th>
                <th className={bcl}>Content</th>
                <th className={bcl}>Author</th>
                <th className={bcl}>Tags</th>
                <th className={bcl}>Files</th>
                <th className={bcl}>Date Created</th>
            </tr>
        </thead>
        <tbody>
            {blogItems.map((item, key) => {
                return <tr className={bcl} key={item.id}>
                    <td className={bcl}>{item.id}</td>
                    <td className={bcl}>
                        <button className="flex gap-2 cursor-pointer hover:bg-green-600 rounded-lg p-2" onClick={(e) => changeUpdateForm(e, item.id)}>Update</button>
                    </td>
                    <td className={bcl}>
                        <button className="flex gap-2 cursor-pointer hover:bg-red-600 rounded-lg p-2" onClick={(e) => deleteItem(e, item.id, setBlogItems, 'Blog')}><FaTrash size={13} className='self-center' /> Delete</button>
                    </td>
                    <td className={bcl}>{item.title}</td>
                    <td className={bcl}>{item.content}</td>
                    <td className={bcl}>{item.author}</td>
                    <td className={bcl}>{item.tags}</td>
                    <td className={bcl}>{item.files}</td>
                    <td className={bcl}>{item.date_created}</td>
                </tr>;
            })}
        </tbody>
    </table>
}

export default BlogDisplay;