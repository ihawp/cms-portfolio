import { useContext } from 'react';
import { PortfolioContext } from '../providers/PortfolioProvider';
import { FaTrash } from 'react-icons/fa';
import deleteItem from '../utils/deleteItem';

function PortfolioDisplay({ changeUpdateForm }) {

    const { portfolioItems, setPortfolioItems } = useContext(PortfolioContext);

    const bcl = "px-4 border border-gray-400 h-1";

    return <table className="border border-gray-400 border-collapse rounded-lg">
        <thead>
            <tr>
                <th className={bcl}>ID</th>
                <th className={bcl}>Update</th>
                <th className={bcl}>Delete</th>
                <th className={bcl}>Title</th>
                <th className={bcl}>Intro</th>
                <th className={bcl}>Role</th>
                <th className={bcl}>Timeline</th>
                <th className={bcl}>Tools Used</th>
                <th className={bcl}>Skills Applied</th>
                <th className={bcl}>Key Tasks</th>
                <th className={bcl}>Challenges</th>
                <th className={bcl}>Takeaways</th>
                <th className={bcl}>Solution Summary</th>
                <th className={bcl}>GitHub URL</th>
                <th className={bcl}>Site URL</th>
                <th className={bcl}>Images</th>
                <th className={bcl}>Date Created</th>
            </tr>
        </thead>
        <tbody>
            {portfolioItems.map((item, key) => {
                return <tr className={bcl + ' h-1 overflow-scroll'} key={item.id}>
                    <td className={bcl}>{item.id}</td>
                    <td className={bcl}>
                        <button className="flex gap-2 cursor-pointer hover:bg-green-600 rounded-lg p-2" onClick={(e) => changeUpdateForm(e, item.id)}>Update</button>
                    </td>
                    <td className={bcl}>
                        <button className="flex gap-2 cursor-pointer hover:bg-red-600 rounded-lg p-2" onClick={(e) => deleteItem(e, item.id, setPortfolioItems, 'Portfolio')}><FaTrash size={13} className='self-center' /> Delete</button>
                    </td>
                    <td className={bcl}>{item.title}</td>
                    <td className={bcl}>{item.intro}</td>
                    <td className={bcl}>{item.role}</td>
                    <td className={bcl}>{item.timeline}</td>
                    <td className={bcl}>{item.toolsUsed}</td>
                    <td className={bcl}>{item.skillsApplied}</td>
                    <td className={bcl}>{item.keyTasks}</td>
                    <td className={bcl}>{item.challenges}</td>
                    <td className={bcl}>{item.takeaways}</td>
                    <td className={bcl}>{item.solutionSummary}</td>
                    <td className={bcl}>{item.githubURL}</td>
                    <td className={bcl}>{item.projectSite}</td>
                    <td className={bcl}>{item.images || item.files}</td>
                    <td className={bcl}>{item.date_created}</td>
                </tr>;
            })}
        </tbody>
    </table>
}

export default PortfolioDisplay;