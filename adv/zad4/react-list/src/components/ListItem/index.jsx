import "./styles.css";

export default function ListItem(props) {
  const values = props.props;
  return (
    <div className="list-item">
      <img alt="game-image" src={values.image} className="game-img" />
      <div>{values.name}</div>
      <div>{values.description}</div>
      <div>{values.rating}</div>
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
