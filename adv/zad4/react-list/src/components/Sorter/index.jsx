import "./styles.css";

export default function Sorter({ sortItems }) {
  return (
    <div className="sort">
      <label htmlFor="sort">Sort by: </label>
      <select
        id="sort"
        name="sort"
        onChange={() => {
          sortItems(event);
        }}
      >
        <option value="none">None</option>
        <option value="name">Name</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}
