import {FaPlus} from "react-icons/fa";
import { useRef } from "react";

function AddItem({newItem,setNewItem,handleSubmit}) {
    const inputRef = useRef();
    return(
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add Item :</label>
            <input 
                type="text" 
                ref={inputRef}
                id="addItem" 
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                autoFocus
                placeholder="Enter Item"/>
            <button  
                type="submit" 
                aria-label="Add Item"
                onClick={() => inputRef.current.focus()}
            >
                <FaPlus/>
            </button>
            
        </form>
    )
}
export default AddItem;