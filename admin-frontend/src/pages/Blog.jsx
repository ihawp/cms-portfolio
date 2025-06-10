import BlogDisplay from '../components/BlogDisplay';
import BlogForm from '../components/BlogForm';
import { useFormState } from '../hooks/useFormState';
import { useContext } from 'react';
import { BlogContext } from '../providers/BlogProvider';

function Blog() {

    const { blogItems } = useContext(BlogContext);

    return <>
        Blog
    </>
}

export default Blog;