import { useState, useContext } from 'react';
import PortfolioDisplay from "../components/PortfolioDisplay";
import PortfolioForm from "../components/PortfolioForm";
import { FaExternalLinkAlt } from "react-icons/fa";
import portfolioFormOrig from '../utils/portfolioFormOrig';
import { PortfolioContext } from '../providers/PortfolioProvider';

function Portfolio() {

    const { portfolioItems, setPortfolioItems } = useContext(PortfolioContext);

    const [addVisible, setAddVisible] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateForm, setUpdateForm] = useState(portfolioFormOrig);

    const changeUpdateForm = (e, itemId) => {
        const item = portfolioItems.find(p => p.id === itemId);
        if (!item) return;

        console.log('before normalized:', item);

        const normalized = normalizePortfolioItem(item);

        console.log('normalized:', normalized);
        setUpdateForm(normalized);
        setIsUpdate(itemId);
        setAddVisible(true);
    };

    function normalizePortfolioItem(item) {
        const makeArrayOfObjects = (arr, name, key = "value") =>
            Array.isArray(arr)
                ? arr.map((v, g) =>
                    typeof v === "object"
                        ? { id: `${name}${g}`, ...v }
                        : { id: `${name}${g}`, [key]: v }
                )
                : [];

        return {
            date_created: item.date_created || '',
            title: item.title || '',
            intro: item.intro || '',
            role: item.role || '',
            timeline: makeArrayOfObjects(JSON.parse(item.timeline), "timeline"),
            toolsUsed: JSON.parse(item.toolsUsed) || [],
            skillsApplied: makeArrayOfObjects(JSON.parse(item.skillsApplied), "skillsApplied"),
            keyTasks: makeArrayOfObjects(JSON.parse(item.keyTasks), "keyTasks"),
            challenges: makeArrayOfObjects(JSON.parse(item.challenges), "challenges"),
            takeaways: makeArrayOfObjects(JSON.parse(item.takeaways), "takeaways"),
            solutionSummary: item.solutionSummary || '',
            githubURL: item.githubURL || '',
            projectSite: item.projectSite || '',
            files: makeArrayOfObjects(JSON.parse(item.images || item.files)) || []
        };
    }

    const handleAddButton = (e) => {
        e.preventDefault();

        setUpdateForm(portfolioFormOrig);

        setIsUpdate(false);

        setAddVisible(prev => !prev)
    }

    return <main className='flex flex-col'>
        
        <header className="w-full my-4 px-3 flex items-center justify-between">
            <h1 className="text-xl">{addVisible ? isUpdate ? 'Update Portfolio Item' : 'Add Portfolio Item:' : 'Portfolio Table:'}</h1>

            <nav aria-label="Portfolio Table Navigation">
                <ul className='flex gap-3 justify-end'>
                    <li>
                        <a className="border border-blue-500 text-blue-500 w-max p-2 rounded-lg cursor-pointer flex gap-2" href={import.meta.env.VITE_SERVER_URL} title="View the live site (ihawp.com/portfolio)."><FaExternalLinkAlt size={14} className='self-center' /> View Page</a>
                    </li>
                    <li>
                        <button className={`${addVisible ? 'bg-red-600' : 'bg-green-600'} w-max p-2 rounded-lg cursor-pointer`} onClick={handleAddButton}>{addVisible ? '- Discard' : '+ Add'}</button>
                    </li>
                </ul>
            </nav>
        </header>

        {addVisible ? <section className='overflow-x-visible overflow-y-hidden flex flex-col items-center'>
            <PortfolioForm formOrig={updateForm} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdateForm={setUpdateForm} />
        </section> : <section className='w-full overflow-x-auto overflow-y-hidden'>
            <PortfolioDisplay changeUpdateForm={changeUpdateForm} />
        </section>}

    </main>
}

export default Portfolio;