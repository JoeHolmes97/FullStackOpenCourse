
const Filter = ({ filter, setFilter }) => {
    const handleFilter = (event) => {
        //console.log(event.target.value)
        setFilter(event.target.value)
    }

    return (
        <div>
            <form>
                Filter shown with: <input value={filter} onChange={handleFilter}></input>
            </form>
        </div>
    )
}

export default Filter