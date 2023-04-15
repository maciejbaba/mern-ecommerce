import "../../css/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, emptyCart } from "./cartSlice";

const Cart = () => {
  const items = useSelector(state => state.cart.items);

  const dispatch = useDispatch();

  const handleRemoveItem = item => {
    dispatch(removeFromCart(item));
  };

  const handleRemoveAll = () => {
    dispatch(emptyCart());
  };

  return (
    <main className="main-cart">
      <div className="cart-heading">
        <button className="remove-all-button" onClick={handleRemoveAll}>
          Remove all items
        </button>
        <h1>Your items</h1>
      </div>
      {items.length === 0 && <p>Your cart is empty</p>}
      <div className="user-items-list">
        {items.map(item => (
          <div className="user-item" key={item.id}>
            <img className="cart-img" src={item.photoURL} />
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
};

export default Cart;
