import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "./itemsApiSlice";
import "../../css/ItemPage.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

const ItemPage = () => {
  const { id } = useParams();
  const { data: items, isLoading, isSuccess } = useGetItemsQuery();
  const item = items?.entities[id];

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <main className="item-page">
        <h1>Item {item?.name}</h1>
        <img className="item-page__img" src={item?.photoURL} alt={item?.name} />
        <p>Description {item?.description}</p>
        <p>Price: {`${item?.price} $`}</p>
        <button className="item-page__add-to-cart-button" onClick={handleAddToCart}>
          Add to cart
        </button>
      </main>
    );
  }

  return content;
};

export default ItemPage;
