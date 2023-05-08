import Item from "./Item";
import "../../css/ItemsList.css";
import { useGetItemsQuery } from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";

const ItemsList = ({ isPublicPage }) => {
  const { data: items, isLoading, isSuccess, isError } = useGetItemsQuery();

  const navigate = useNavigate();

  const handleAddNewItem = () => navigate("/items/newItem");

  let content;

  if (isLoading) {
    content = (
      <div className="items-list__loading">Loading list of items...</div>
    );
  }

  if (isSuccess) {
    content = (
      <div className="items-list">
        {items.ids.map(itemId => (
          <Item key={itemId} id={itemId} />
        ))}
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="items-list__error">
        <p>Opss the list of items cannot be loaded. We are truly sorry</p>
      </div>
    );
  }

  return (
    <main>
      {!isPublicPage && ( // used to hide the add item button on the public page
        <button
          className="items-list__add-item-button"
          onClick={handleAddNewItem}
        >
          Add item
        </button>
      )}
      {content}
    </main>
  );
};

export default ItemsList;
