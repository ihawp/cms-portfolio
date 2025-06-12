import copyWindowLocation from '../utils/copyWindowLocation';
import updateDocumentTitle from "../utils/updateDocumentTitle";

function BlogSingle() {



    // updateDocumentTitle();

    return <div className="w-100 bg-red-500">
        <a className="cursor-pointer" onClick={copyWindowLocation}>Share</a>
    </div>
}

export default BlogSingle;