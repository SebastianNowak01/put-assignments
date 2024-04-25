import { useState } from "react";
import list from "../../assets/items.json";
import ListItem from "../ListItem/index";
import ItemCreator from "../ItemCreator";
import "./styles.css";
import SearchBar from "../SearchBar";
import Sorter from "../Sorter";

export default function List() {
  const [items, setItems] = useState(list.data);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("none");

  function changeRating(id, rating) {
    const newItems = items.map((item) => {
      console.log(item);
      if (item.id === id) {
        console.log(id);
        item.rating = rating;
      }
      return item;
    });
    setItems(newItems);
  }

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

  function sortItems(event) {
    const sort = event.target.value;
    setSortType(sort);
  }

  const listItems = items
    .map((item) => {
      return (
        <ListItem
          props={item}
          key={item.id}
          deleteItem={deleteItem}
          changeRating={changeRating}
        />
      );
    })
    .filter((item) => {
      if (searchText === "") {
        return item;
      } else if (item.props.props.name.toLowerCase().includes(searchText)) {
        return item;
      }
    })
    .sort((a, b) => {
      if (sortType === "none") return 0;
      if (sortType === "name") {
        a = a.props.props.name.toLowerCase()[0];
        b = b.props.props.name.toLowerCase()[0];
        return a.localeCompare(b);
      }
      if (sortType === "rating") {
        a = a.props.props.rating;
        b = b.props.props.rating;
        return b - a;
      }
    });

  return (
    <>
      <div>
        <ItemCreator addItem={addItem} />
        <Sorter sortItems={sortItems} />
        <SearchBar searchItem={searchItems} />
        {listItems}
      </div>
    </>
  );
}
