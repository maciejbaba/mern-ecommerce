import { useSelector, useDispatch } from "react-redux";
import { selectItemById } from "./itemsApiSlice";
import "../../css/Item.css";
import { addToCart } from "../cart/cartSlice";
import { Link } from "react-router-dom";

const DEFAULT_PHOTO_URL = "./no-image.png";
const MAX_DESCRIPTION_LENGTH = 50;

const Item = ({ id }) => {
  const item = useSelector(state => selectItemById(state, id));

  const dispatch = useDispatch();

  const handleAddToCart = e => {
    e.preventDefault();
    dispatch(addToCart(item));
  };

  return (
    <Link to={`/items/item/${item.id}`}>
      <main className="item">
        <img
          className="item__img"
          src={
            item.photoURL === DEFAULT_PHOTO_URL
              ? DEFAULT_PHOTO_URL
              : item.photoURL
          }
          alt={
            item.photoURL === DEFAULT_PHOTO_URL
              ? "Image didn't load"
              : `Photo of ${item.name}`
          }
        />
        <h2 className="item__name">{item.name}</h2> {/* change magic number */}
        <p className="item__description">
          {item.description.length < MAX_DESCRIPTION_LENGTH
            ? item.description
            : item.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."}
        </p>
        <p className="item__price">Price: {`${item.price} $`}</p>
        <button className="item__add-to-cart-button" onClick={handleAddToCart}>
          Add to cart
        </button>
      </main>
    </Link>
  );
};

export default Item;
