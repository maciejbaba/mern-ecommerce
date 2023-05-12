import "../../css/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, emptyCart, selectCartItems } from "./cartSlice";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/myButton";

type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  photoURL: string;
};

const Cart = () => {
  const items: CartItem[] = useSelector(selectCartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuy = () => {
    navigate("/cart/checkout");
  };

  const handleRemoveItem = (item: CartItem) =>
    dispatch({
      type: "cart/removeFromCart",
      payload: item,
    });

  const handleRemoveAll = () => dispatch(emptyCart());

  let content;

  if (items.length === 0) {
    content = <p className="cart__empty-cart">Your cart is empty</p>;
  }

  if (items.length > 0) {
    content = (
      <main className="cart">
        <div className="cart__heading">
          <MyButton
            className="cart__remove-all-button"
            onClick={handleRemoveAll}
          >
            Remove all items
          </MyButton>
          <MyButton className="cart__buy-items-button" onClick={handleBuy}>
            Buy items
          </MyButton>
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
              <p>
                {item.description.length > 50
                  ? item.description.slice(0, 50) + "..."
                  : item.description}
              </p>
              <p>{item.price}</p>
              <MyButton onClick={() => handleRemoveItem(item)}>Remove</MyButton>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return content;
};

export default Cart;