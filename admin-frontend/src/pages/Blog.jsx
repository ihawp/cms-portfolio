import { useContext } from 'react';
import BlogDisplay from "../components/BlogDisplay";
import BlogForm from "../components/BlogForm";
import blogFormOrig from '../utils/blogFormOrig';
import { BlogContext } from '../providers/BlogProvider';
import makeArrayOfObjects from '../utils/makeArrayOfObjects';
import TableMaster from '../components/TableMaster';

function Blog() {

    const { blogItems } = useContext(BlogContext);

    function normalizeBlogItem(item) {
        console.log(item);

        return {
            date_created: item.date_created || '',
            title: item.title || '',
            author: item.author || '',
            content: JSON.parse(item.content || []),
            tags: makeArrayOfObjects(JSON.parse(item.tags || []), "tags"),
            files: makeArrayOfObjects(JSON.parse(item.files || []), "files")
        };
    }

    return <TableMaster 
        Display={ BlogDisplay }
        Form={ BlogForm }
        formOrig={ blogFormOrig }
        items={ blogItems }
        normalizeItem={ normalizeBlogItem }
        title="Blog"
    />
}

export default Blog;