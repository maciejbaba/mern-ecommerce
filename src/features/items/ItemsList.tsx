import Item from "./Item";
import "../../css/ItemsList.css";
import { useGetItemsQuery } from "./itemsApiSlice";

const ItemsList = () => {
  const { data: items, isLoading, isSuccess, isError } = useGetItemsQuery();

  if (isLoading) {
    return <div className="items-list__loading">Loading list of items...</div>;
  }

  if (isSuccess) {
    return (
      <div className="items">
        <h1>Items</h1>
        <div className="items-list">
          {items.ids.map((itemId) => (
            <Item key={itemId} id={itemId} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="items-list__error">
        <p>Opss the list of items cannot be loaded. We are truly sorry</p>
      </div>
    );
  }

  return null;
};

export default ItemsList;
