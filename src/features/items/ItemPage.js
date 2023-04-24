import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "./itemsApiSlice";
import "../../css/ItemPage.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

const ItemPage = () => {
  const { id } = useParams();
  const { data: items, isLoading, isSuccess, isError } = useGetItemsQuery();

  const dispatch = useDispatch();

  let content;

  if (isLoading) {
    content = (
      <main className="item-page__loading">
        <p>Loading item data...</p>
      </main>
    );
  }

  if (isSuccess) {
    const handleAddToCart = () => dispatch(addToCart(item));
    const item = items.entities[id];

    content = (
      <main className="item-page">
        <h1>Item {item.name}</h1>
        <img className="item-page__img" src={item.photoURL} alt={item.name} />
        <p>Description {item.description}</p>
        <p>Price: {`${item.price} $`}</p>
        <button
          className="item-page__add-to-cart-button"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </main>
    );
  }

  if (isError) {
    content = (
      <main className="item-page__error">
        <p>Sorry we cannot load item's data</p>
      </main>
    );
  }

  return content;
};

export default ItemPage;
