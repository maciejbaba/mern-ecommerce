import Item from "./Item";
import "../../css/ItemsList.css";
import { useGetItemsQuery } from "./itemsApiSlice";

type ItemsListProps = {
  amountToShow?: number;
};

const ItemsList = ({ amountToShow = 0 }: ItemsListProps) => {
  const { data: items, isLoading, isSuccess, isError } = useGetItemsQuery();

  if (isLoading) {
    return <div className="items-list__loading">Loading list of items...</div>;
  }

  if (isSuccess && amountToShow > 0) {
    return (
      <div className="items">
        <h1>Items</h1>
        <div className="items-list">
          {items.ids.slice(0, amountToShow).map((itemId) => (
            <Item key={itemId} id={itemId} />
          ))}
        </div>
      </div>
    );
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

  return <div>If you see this the items cannot be loaded</div>;
};

export default ItemsList;
