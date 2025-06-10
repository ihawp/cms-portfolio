function PortfolioItem({ item }) {
    return <div className="max-w-40">

        <p>{item.id}</p>

        <h2>{item.title}</h2>

        {JSON.parse(item.images).map((item, key) => {
            return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + item} key={key} alt="" title="" draggable="false" />
        })}
    </div>
}

export default PortfolioItem;