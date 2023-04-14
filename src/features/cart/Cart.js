import "../../css/Cart.css";
import { useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector(state => state.cart.items);

  return (
    <main className="main-cart">
      <div className="cart-heading">
        <h1>Your items</h1>
      </div>
      <div className="user-items-list">
        {items.map(item => (
          <div className="user-item" key={item.id}>
            <img />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Cart;
