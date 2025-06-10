const deleteItem = async (e, id, setItems, type) => {
    e.preventDefault();
    // Use window.confirm instead of custom modal (for now?).
    if (!window.confirm(`Do you want to delete ${type} Item #${id}?`)) return;
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `api/v1/${type}/${encodeURIComponent(id)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!response.ok) return false;
        const data = await response.json();
        if (data.error) return false;
        setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
        return false;
    }
}

export default deleteItem;