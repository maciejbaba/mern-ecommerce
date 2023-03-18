import { Link } from "react-router-dom";
import "../css/Public.css";
import { useGetItemsQuery } from "../features/items/itemsApiSlice";
import Item from "../features/items/Item";

const Public = () => {
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
      <div>
        {items.ids.map((itemId) => (
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

  return <main className="public">{content}</main>;
};

export default Public;
