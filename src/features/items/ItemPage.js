import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "./itemsApiSlice";
import "../../css/ItemPage.css";

const ItemPage = () => {
  const { id } = useParams();
  const { data: items, isLoading, isSuccess } = useGetItemsQuery();
  const item = items?.entities[id];

  const handleAddToCart = () => {};

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <main className="item-page-main">
        <h1>Item {item?.name}</h1>
        <img src={item?.photoURL} alt={item?.name} />
        <p>Description {item?.description}</p>
        <p>Price: {item?.price}</p>
        <button className="item-page-button-add" onClick={handleAddToCart}>
          Add to cart
        </button>
      </main>
    );
  }

  return content;
};

export default ItemPage;
