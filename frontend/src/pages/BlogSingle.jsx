function BlogSingle() {

    const copyShareLink = (e) => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard'))
            .catch(() => alert('Failed to copy share link'));
    }

    return <>
        <a className="cursor-pointer" onClick={copyShareLink}>Share</a>
    </>
}

export default BlogSingle;