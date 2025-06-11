function formatDate(date) {
    const dateCreated = new Date(date);
    return <span>{dateCreated.getFullYear()}-{dateCreated.getMonth > 9 ? '' : '0'}{dateCreated.getMonth() + 1}-{dateCreated.getDate() > 9 ? '' : '0'}{dateCreated.getDate()}</span>
}

export default formatDate;