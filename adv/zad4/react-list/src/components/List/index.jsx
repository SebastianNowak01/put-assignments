import { useState } from "react";
import list from "../../assets/items.json";
import ListItem from "../ListItem/index";
import ItemCreator from "../ItemCreator";
import "./styles.css";
import SearchBar from "../SearchBar";

export default function List() {
  const [items, setItems] = useState(list.data);
  const [searchText, setSearchText] = useState("");

  function addItem(item) {
    setItems([...items, item]);
  }

  function deleteItem(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  function searchItems(event) {
    const search = event.target.value;
    setSearchText(search.toLowerCase());
  }

  return (
    <>
      <div>
        <ItemCreator addItem={addItem} />
        <SearchBar searchItem={searchItems} />
        {items
          .map((item) => {
            return (
              <ListItem props={item} key={item.id} deleteItem={deleteItem} />
            );
          })
          .filter((item) => {
            console.log(item);
            if (searchText === "") {
              return item;
            } else if (
              item.props.props.name.toLowerCase().includes(searchText)
            ) {
              return item;
            }
          })}
      </div>
    </>
  );
}
