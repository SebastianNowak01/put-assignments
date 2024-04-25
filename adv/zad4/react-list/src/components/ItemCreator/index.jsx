import "./styles.css";
import { useState } from "react";

export default function ItemCreator({ addItem }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  let id = 4;

  function handleImageChange(event) {
    console.log(URL.createObjectURL(event.target.files[0]));
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleRatingChange(event) {
    setRating(event.target.value);
  }

  function handleSubmit() {
    if (name && description && image && rating) {
      addItem({ id, name, description, image, rating });
      id++;
      setImage("");
      setName("");
      setDescription("");
      setRating(0);
    } else {
      alert("Please fill all the fields");
    }
  }

  return (
    <div className="item-creator">
      <h2>Create a new item</h2>
      <div className="form-creator">
        <button
          type="submit"
          id="submit-button"
          onClick={() => {
            handleSubmit();
          }}
        >
          &#43;
        </button>
        <div>
          <label>Image: </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
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
      </div>
    </div>
  );
}
