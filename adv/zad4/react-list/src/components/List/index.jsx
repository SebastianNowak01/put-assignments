import { useState } from "react";
import list from "../../assets/items.json";
import ListItem from "../ListItem/index";
import ItemCreator from "../ItemCreator";
import "./styles.css";

export default function List() {
  const [items, setItems] = useState(list.data);

  function addItem(item) {
    setItems([...items, item]);
  }

  function deleteItem(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  return (
    <>
      <div>
        <ItemCreator addItem={addItem} />
        {items.map((item) => {
          return (
            <ListItem props={item} key={item.id} deleteItem={deleteItem} />
          );
        })}
      </div>
    </>
  );
}
