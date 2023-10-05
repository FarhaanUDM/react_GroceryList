
import List from "./List";


function Content({items,handleCheck,handleDelete}) {
    
    return(
        <>
            {items.length?(
                <List
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ):(
                <p style={{marginTop:'2rem'}}> Grocery list empty !</p>
            )}
           
        </>
    )
}

export default Content;