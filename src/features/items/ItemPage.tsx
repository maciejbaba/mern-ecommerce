import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "./itemsApiSlice";
import "../../css/ItemPage.css";
import { useDispatch } from "react-redux";
import { CartItem, addToCart } from "../cart/cartSlice";
import MyButton from "../../components/myButton";

const ItemPage = () => {
  const { id } = useParams();
  const { data: items, isLoading, isSuccess, isError } = useGetItemsQuery();

  const dispatch = useDispatch();

  let content = <p>Loading item data...</p>; // basic JSX.Element otherwise TS complains

  if (!id) {
    content = (
      <main className="item-page__error">
        <p>Sorry, we cannot load item's data because of lack of id</p>
      </main>
    );
  }

  if (isLoading) {
    content = (
      <main className="item-page__loading">
        <p>Loading item data...</p>
      </main>
    );
  }

  if (isSuccess && id) {
    const item = items.entities[id];

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
      const cartItem: CartItem = { ...item, quantity: 1 }; // create cartItem object from item object, for now quantity is set to 1 by default
      const handleAddToCart = () => dispatch(addToCart(cartItem)); // function declaration is inside else block to prevent dispatching undefined

      content = (
        <main className="item-page">
          <h1>Item {item.name}</h1>
          <img className="item-page__img" src={item.photoURL} alt={item.name} />
          <p>{item.description}</p>
          <p>
            <strong>Price:</strong> {`${item.price} $`}
          </p>
          <MyButton className="button" onClick={handleAddToCart}>
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
