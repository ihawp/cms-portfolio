function BlogItem({ item }) {
    return <div className="max-w-40">

        <p>{item.id}</p>

        <h2>{item.title}</h2>

        { item.files ? JSON.parse(item.files).map((item, key) => {
            return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + item} key={key} alt="" title="" draggable="false" />
        }) : null }
    </div>
}

export default BlogItem;