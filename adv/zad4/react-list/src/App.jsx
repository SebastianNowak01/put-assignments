import "./App.css";
import Header from "./components/Header/index";
import List from "./components/List/index";
import ItemCreator from "./components/ItemCreator";

function App() {
  return (
    <>
      <Header />
      <ItemCreator />
      <List />
    </>
  );
}

export default App;
