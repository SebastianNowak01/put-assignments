import "./styles.css";
import { useState } from "react";

export default function ItemCreator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleRatingChange(event) {
    setRating(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Name: ", name);
    console.log("Description: ", description);
    console.log("Rating: ", rating);
  }

  return (
    <div className="item-creator">
      <h2>Create a new item</h2>
      <form className="form-creator">
        <button
          type="submit"
          id="submit-button"
          onSubmit={() => {
            handleSubmit;
          }}
        >
          &#43;
        </button>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={handleRatingChange}
            min={0}
            max={10}
          />
        </div>
      </form>
    </div>
  );
}
