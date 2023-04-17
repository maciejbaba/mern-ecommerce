import "../../css/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, emptyCart, selectCartItems } from "./cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const items = useSelector(selectCartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuy = () => {
    navigate("/cart/checkout");
  };

  const handleRemoveItem = item => dispatch(removeFromCart(item));

  const handleRemoveAll = () => dispatch(emptyCart());

  let content;

  if (items.length === 0) {
    content = <p className="empty-cart">Your cart is empty</p>;
  }

  if (items.length > 0) {
    content = (
      <main className="main-cart">
        <div className="cart-heading">
          <button className="remove-all-button" onClick={handleRemoveAll}>
            Remove all items
          </button>
          <button className="buy-items-button" onClick={handleBuy}>Buy items</button>
          <h1>Your items</h1>
        </div>
        <div className="user-items-list">
          {items.map(item => (
            <div className="user-item" key={item.id}>
              <img
                className="cart-img"
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
              <button onClick={() => handleRemoveItem(item)}>Remove</button>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return content;
};

export default Cart;
