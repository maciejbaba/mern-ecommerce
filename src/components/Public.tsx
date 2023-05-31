import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "../css/Public.css";
import ItemsList from "../features/items/ItemsList";
import MyButton from "./myButton";

const Public = () => {
  const itemsListRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isPublicPage: boolean = true;

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
        <MyButton
          className="public__browse-items-button"
          onClick={handleBrowseItemsButtonClick}
        >
          Browse Items
        </MyButton>
      </div>
      <div ref={itemsListRef}>
        <ItemsList isPublicPage={isPublicPage} />
      </div>
      <MyButton
        className="public__more-items-button"
        onClick={handleMoreItemsButton}
      >
        More items
      </MyButton>
    </main>
  );
};

export default Public;
