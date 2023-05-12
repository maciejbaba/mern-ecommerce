import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "./itemsApiSlice";
import "../../css/ItemPage.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import MyButton from "../../components/myButton";

const ItemPage = () => {
  let { id } = useParams();
  const { data: items, isLoading, isSuccess, isError } = useGetItemsQuery();

  const dispatch = useDispatch();

  let content;

  if (!id) {
    content = (
      <main className="item-page__error">
        <p>Sorry, we cannot load item's data because of lack of id</p>
      </main>
    );
  }

  const newId = Number(id);

  if (isLoading) {
    content = (
      <main className="item-page__loading">
        <p>Loading item data...</p>
      </main>
    );
  }

  if (isSuccess) {
    const handleAddToCart = () => dispatch(addToCart(item));
    const item = items.entities[newId];

    if (!item) {
      content = (
        <main className="item-page__error">
          <p>
            Sorry, we cannot load item's data - there is no item with specified
            id
          </p>
        </main>
      );
    } else {
      content = (
        <main className="item-page">
          <h1>Item {item.name}</h1>
          <img className="item-page__img" src={item.photoURL} alt={item.name} />
          <p>Description {item.description}</p>
          <p>Price: {`${item.price} $`}</p>
          <MyButton
            className="item-page__add-to-cart-button"
            onClick={handleAddToCart}
          >
            Add to cart
          </MyButton>
        </main>
      );
    }
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
