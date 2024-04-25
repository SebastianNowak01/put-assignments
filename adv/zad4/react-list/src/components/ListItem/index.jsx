import { useState } from "react";
import "./styles.css";

export default function ListItem(props) {
  const values = props.props;

  return (
    <div className="list-item">
      <img alt="game-image" src={values.image} className="game-img" />
      <div>{values.name}</div>
      <div>{values.description}</div>
      <input
        type="number"
        min="0"
        max="10"
        value={values.rating}
        onChange={() => {
          props.changeRating(values.id, event.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          props.deleteItem(values.id);
        }}
      >
        &#8722;
      </button>
    </div>
  );
}
