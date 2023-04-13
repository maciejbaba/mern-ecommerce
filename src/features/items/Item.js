import { useSelector } from "react-redux";
import { selectItemById } from "./itemsApiSlice";
import "../../css/Item.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../cart/CartProvider";

const Item = ({ id }) => {
  const item = useSelector(state => selectItemById(state, id));
  const cart = useContext(CartContext);

  const handleAddToCart = () => {
    cart.addItem(item);
  };
  
  return (
    <Link to={`/items/${item.id}`}>
      <div className="item-container">
        <img
          className="item-img"
          src={item.photoURL ? item.photoURL : "no-image.png"}
          alt={
            item.photoURL === "no-image.png"
              ? "Image didn't load"
              : `Photo of ${item.name}`
          }
        />
        <h2 className="item-name">{item.name}</h2> {/* change magic number */}
        <p className="item-description">
          {item.description.length < 150
            ? item.description
            : item.description.slice(0, 150) + "..."}
        </p>
        <p className="item-price">Price: {item.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </Link>
  );
};

export default Item;
