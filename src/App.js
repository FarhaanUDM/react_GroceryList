import Header from './Header';
import Content from './Content';
import SearchItem from './SearchItem';
import Footer from './Footer';
import { useState,useEffect } from 'react';
import AddItem from './AddItem';
import ApiReq from './ApiReq';

function App() {
  const API_URL = "http://localhost:3500/items";

  const [items,setItems] = useState([])
  const [newItem,setNewItem] = useState('');
  const [search,setSearch] = useState('');
  const [fetchErr,setFetchErr] = useState(null);
  const [isLoad,setIsLoad] = useState(true);

  /* reading data from json-server file at load time
   since an empty array is initialized */

  useEffect(()=> {
    
    const fetchItems = async () => {
      try {
      const response = await fetch(API_URL);
      if(!response.ok)
        throw Error("Did not get data from resources !");
      
      const listItems = await response.json();
      setItems(listItems)
      setFetchErr(null);
      
      } catch (err) {
        setFetchErr(err.message)
      } finally {
        setIsLoad(false);
      }
    }

    setTimeout(() => {
      (async () => await fetchItems())();
        },1500)
    },[]);

    const addItem = async (item) => {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const newItem = {id:id,checked:false,item}
      const listItems = [...items,newItem]
      setItems(listItems);

      /* add api items */
      const postOptions = {
        method : 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify(newItem)
      }

      const result = await ApiReq(API_URL,postOptions);
      if (result)  setFetchErr(result);
    }

      function handleSubmit(e) {
        e.preventDefault();
        addItem(newItem)
        setNewItem('');
      }

      const handleCheck = async (id) => {
        const listItems = items.map((item) => 
            item.id === id 
            ? {...item,checked:!item.checked} 
            :  item)

            setItems(listItems);
      /* update item properties in api */
          const myItem = listItems.filter((item) => item.id === id);
          
          const updateOptions = {
            method : 'PATCH',
            headers : {
              'Content-type' : 'application/json'
            },
            body : JSON.stringify({ checked : myItem[0].checked })
          }

          const reqUrl = `${API_URL}/${id}`;
          const result = await ApiReq(reqUrl,updateOptions);
          if (result) setFetchErr(result);
    }

    const handleDelete = async (id) => {
        const listItems = items.filter((item) => 
        item.id !== id)
        setItems(listItems);

        /* delete api items */

        const delOptions = {
          method:'DELETE'
        };
        const reqUrl = `${API_URL}/${id}`;
        const result = await ApiReq(reqUrl,delOptions);
        if (result) setFetchErr(result);
  }
    

  return (
    <div className="App">
      <Header/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoad && <p>Loading items ...</p>}
        {fetchErr && <p style = {{color:"red"}}>{`Error : ${fetchErr}`}</p>}
        {!fetchErr && !isLoad &&<Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete = {handleDelete}
        />}
      </main>
      <Footer 
      length = {items.length}
      />
    </div>
  );
}

export default App;
