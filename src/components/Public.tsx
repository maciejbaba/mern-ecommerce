import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "../css/Public.css";
import ItemsList from "../features/items/ItemsList";
import MyButton from "./myButton";

const Public = () => {
  const itemsListRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleBrowseItemsButtonClick = () => {
    itemsListRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <ItemsList amountToShow={10}/>
      </div>
      <MyButton
        className="public__more-items-button"
        onClick={() => navigate("/items")}
      >
        More items
      </MyButton>
    </main>
  );
};

export default Public;
