const copyWindowLocation = () => {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard.'))
        .catch(() => alert('Failed to copy share link.'));
}

export default copyWindowLocation;