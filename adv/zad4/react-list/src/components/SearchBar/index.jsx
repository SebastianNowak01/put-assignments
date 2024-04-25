import "./styles.css";

export default function SearchBar({ searchItem }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name"
        onChange={() => {
          searchItem(event);
        }}
      />
    </div>
  );
}
