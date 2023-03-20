import Item from "./Item";
import "../../css/ItemsList.css"
import { useGetItemsQuery } from "./itemsApiSlice";
import { forwardRef } from "react";

const ItemsList = forwardRef(({}, ref) => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery();

  let content = <div></div>;

  if (isLoading) {
    content = <div ref={ref}>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <div ref={ref} className="items-list-component">
        {items.ids.map((itemId) => (
          <Item key={itemId} id={itemId}></Item>
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div ref={ref}>
        <h1>Bip boop ERROR</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return content;
});

export default ItemsList;
