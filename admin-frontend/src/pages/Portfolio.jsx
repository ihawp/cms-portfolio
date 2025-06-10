import { useContext } from 'react';
import PortfolioDisplay from "../components/PortfolioDisplay";
import PortfolioForm from "../components/PortfolioForm";
import portfolioFormOrig from '../utils/portfolioFormOrig';
import { PortfolioContext } from '../providers/PortfolioProvider';
import makeArrayOfObjects from '../utils/makeArrayOfObjects';
import TableMaster from '../components/TableMaster';

function Portfolio() {

    const { portfolioItems } = useContext(PortfolioContext);

    function normalizePortfolioItem(item) {
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

    return <TableMaster 
        Display={ PortfolioDisplay }
        Form={ PortfolioForm }
        formOrig={ portfolioFormOrig }
        items={ portfolioItems }
        normalizeItem={ normalizePortfolioItem }
        title="Portfolio"
    />
}

export default Portfolio;