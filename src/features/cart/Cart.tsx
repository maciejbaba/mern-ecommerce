import "../../css/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  emptyCart,
  selectCartItems,
  selectCartTotal,
} from "./cartSlice";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
import { CartItem } from "./cartSlice";
import { MAX_DESCRIPTION_LENGTH } from "../items/Item";

const Cart = (): JSX.Element => {
  const items: CartItem[] = useSelector(selectCartItems);

  const total: number = useSelector(selectCartTotal);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuy = () => {
    navigate("/cart/checkout");
  };

  const handleRemoveItem = (item: CartItem) => dispatch(removeFromCart(item));

  const handleRemoveAll = () => dispatch(emptyCart());

  let content = <p>Loading cart...</p>;

  if (items.length === 0 || !items) {
    content = <p className="cart__empty-cart">Your cart is empty</p>;
  }

  if (items.length > 0) {
    content = (
      <main className="cart">
        <div className="cart__heading">
          <h1>Your items</h1>
        </div>
        <div className="cart__user-items-list">
          {items.map((item: CartItem) => (
            <div className="cart__user-item" key={item.id}>
              <img
                className="cart__img"
                src={item.photoURL}
                alt={`${item.name}`}
              />
              <h2>{item.name}</h2>
              <p className="cart__description">
                {item.description.length > MAX_DESCRIPTION_LENGTH
                  ? item.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
                  : item.description}
              </p>
              <p>{item.price} $</p>
              <p>Quantity: {item.quantity}</p>
              <MyButton
                className="cart__user-item__remove-button"
                onClick={() => handleRemoveItem(item)}
              >
                Remove from the cart
              </MyButton>
            </div>
          ))}
        </div>
        <footer className="cart__footer">
          <MyButton
            className="cart__remove-all-button"
            onClick={handleRemoveAll}
          >
            Remove all items
          </MyButton>
          <p className="cart__footer__total-p">Total amount: {total} $</p>
          <MyButton className="cart__buy-items-button" onClick={handleBuy}>
            Buy items
          </MyButton>
        </footer>
      </main>
    );
  }

  return content;
};

export default Cart;
