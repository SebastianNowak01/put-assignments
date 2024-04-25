import { useState } from "react";
import list from "../../assets/items.json";
import ListItem from "../ListItem/index";
import "./styles.css";

export default function List() {
  const [items, setItems] = useState(list.data);
  return (
    <>
      <div>
        {items.map((item) => {
          return <ListItem props={item} key={item.id} />;
        })}
      </div>
    </>
  );
}
