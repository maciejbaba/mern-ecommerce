import Item from "./Item";
import "../../css/ItemsList.css";
import { useGetItemsQuery } from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";

const ItemsList = ({ isPublicPage }) => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery();

  const navigate = useNavigate();

  const handleAddNewItem = () => navigate("/items/newItem");

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <div className="items-list-component">
        {items.ids.map(itemId => (
          <Item key={itemId} id={itemId}></Item>
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <h1>Bip boop ERROR</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {!isPublicPage && (
        <button
          className="items-list-add-item-button"
          onClick={handleAddNewItem}
        >
          Add item
        </button>
      )}
      {content}
    </div>
  );
};

export default ItemsList;
