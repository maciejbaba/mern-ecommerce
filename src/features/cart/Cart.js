import "../../css/Cart.css";
import { useContext } from "react";
import { CartContext } from "./CartProvider";

const Cart = () => {
  const cart = useContext(CartContext);
  console.log(cart);

  return (
    <main className="main-cart">
      <div className="cart-heading">
        <h1>Your items</h1>
      </div>
      <div className="user-items-list">
        {cart.items.map((item) => {
          return (
            <div className="user-item" key={item.id}>
              <img src={item.imageURL} alt={item.name} />
              <div className="user-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>{item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Cart;
