import { Link } from "react-router-dom";
import "../css/Public.css";
import ItemsList from "../features/items/ItemsList";

const Public = () => {
  return (
    <main className="public">
      <ItemsList />
    </main>
  );
};

export default Public;
