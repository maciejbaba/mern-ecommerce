import { useSelector, useDispatch } from "react-redux";
import { selectItemById } from "./itemsApiSlice";
import "../../css/Item.css";
import { addToCart } from "../cart/cartSlice";
import { Link } from "react-router-dom";

const Item = ({ id }) => {
  const item = useSelector(state => selectItemById(state, id));
  
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(item));
  };

  return (
    <Link to={`/items/${item.id}`}>
      <div className="item">
        <img
          className="item__img"
          src={item.photoURL ? item.photoURL : "no-image.png"}
          alt={
            item.photoURL === "no-image.png"
              ? "Image didn't load"
              : `Photo of ${item.name}`
          }
        />
        <h2 className="item__name">{item.name}</h2> {/* change magic number */}
        <p className="item__description">
          {item.description.length < 50
            ? item.description
            : item.description.slice(0, 50) + "..."}
        </p>
        <p className="item__price">Price: {item.price}</p>
        <button className="item__add-to-cart-button" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </Link>
  );
};

export default Item;
