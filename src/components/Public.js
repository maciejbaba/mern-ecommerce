import { Link } from "react-router-dom";
import { useRef } from "react";
import "../css/Public.css";
import ItemsList from "../features/items/ItemsList";

const Public = () => {
  const itemsListRef = useRef();

  const handleBrowseItemsButtonClick = () => {
    itemsListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="public">
      <div className="hero">
        <h1>Welcome to our store!</h1>
        <p>We hope that you will find something for yourself</p>
        <button className="browse-items-button" onClick={handleBrowseItemsButtonClick}>
          Browse Items
        </button>
      </div>
      <div>
        <ItemsList ref={itemsListRef} />
      </div>
    </main>
  );
};

export default Public;
