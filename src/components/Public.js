import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "../css/Public.css";
import ItemsList from "../features/items/ItemsList";

const Public = () => {
  const itemsListRef = useRef();
  const navigate = useNavigate();
  const isPublicPage = true; // change this functionality to button on public page

  const handleBrowseItemsButtonClick = () => {
    itemsListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMoreItemsButton = () => {
    navigate("/items");
  };

  return (
    <main className="public">
      <div className="public__hero">
        <h1>Welcome to our store!</h1>
        <p>We hope that you will find something for yourself</p>
        <button
          className="public__browse-items-button"
          onClick={handleBrowseItemsButtonClick}
        >
          Browse Items
        </button>
      </div>
      <div ref={itemsListRef}>
        <ItemsList isPublicPage={isPublicPage} />
      </div>
      <button
        className="public__more-items-button"
        onClick={handleMoreItemsButton}
      >
        More items
      </button>
    </main>
  );
};

export default Public;
