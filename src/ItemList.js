import {FaTrash} from "react-icons/fa";

function ItemList({item,handleCheck,handleDelete}) {
    return (
        <li className="item" >
                        <input
                            onChange={() => handleCheck(item.id)}
                            type="checkbox"
                            checked={item.checked}
                        />
                        <label
                        onDoubleClick={() => handleCheck(item.id)}
                        style={(item.checked) ? {textDecoration:'line-through'}:null}
                        >{item.item}</label>
                        <FaTrash
                            onClick={() =>  handleDelete(item.id)}
                            role = "button"
                            tabIndex="0"
                        />
                    </li>
    )
}
export default ItemList;