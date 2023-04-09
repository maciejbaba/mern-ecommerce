import Item from "./Item";
import "../../css/ItemsList.css";
import { useGetItemsQuery } from "./itemsApiSlice";

const ItemsList = () => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery();

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

  return content;
};

export default ItemsList;
