

function SearchItem({search,setSearch}) {

    return(
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search" >Search</label>
            <input
                id="searh"
                type="text"
                placeholder="search item.."
                role="search"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
                
            />
        </form>
    )
}
export default SearchItem;