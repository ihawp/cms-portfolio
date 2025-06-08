import { useContext } from 'react';
import { PortfolioContext } from '../providers/PortfolioProvider';

function PortfolioDisplay() {

    const { portfolioItems, setPortfolioItems } = useContext(PortfolioContext);

    const deleteItem = async (e, id) => {

        e.preventDefault();

        // Use window.confirm instead of custom modal (for now?).
        if (!window.confirm(`Do you want to delete Portfolio Item #${id}?`)) return;

        try {
            const response = await fetch(`http://localhost:3000/api/v1/portfolio/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) return false;

            const data = await response.json();

            if (data.error) return false;

            setPortfolioItems(prev => prev.filter(item => item.id !== id));

        } catch (error) {
            return false;
        }
    }

    const bcl = "px-4 border border-gray-400";

    return <table className="border border-white border-collapse rounded-lg">
        <thead>
            <tr>
                <th className={bcl}>ID</th>
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
                <th className={bcl}>Update</th>
                <th className={bcl}>Delete</th>
            </tr>
        </thead>
        <tbody>
            {portfolioItems.map((item, key) => {
                return <tr className={bcl}>
                    <td className={bcl}>{item.id}</td>
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
                    <td className={bcl}>{item.images}</td>
                    <td className={bcl}>{item.date_created}</td>
                    <td className={bcl}>
                        <a>Update</a>
                    </td>
                    <td className={bcl}>
                        <button onClick={(e) => deleteItem(e, item.id)}>Delete {item.id}</button>
                    </td>
                </tr>;
            })}
        </tbody>
    </table>
}


function TH({ content }) {
    return <th className={bcl}>{content}</th>
}
export default PortfolioDisplay;