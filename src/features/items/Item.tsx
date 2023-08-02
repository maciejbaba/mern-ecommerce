import { useSelector, useDispatch } from "react-redux";
import { selectItemById } from "./itemsApiSlice";
import "../../css/Item.css";
import { CartItem, addToCart } from "../cart/cartSlice";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { EntityId } from "@reduxjs/toolkit";
import MyButton from "../../components/myButton";

const DEFAULT_PHOTO_URL = "no-image.png";
export const MAX_DESCRIPTION_LENGTH = 40;

type ItemProps = {
  id: EntityId;
};

const Item = ({ id }: ItemProps): JSX.Element => {
  const item = useSelector((state: RootState) => selectItemById(state, id));
  const dispatch = useDispatch();

  let content = <div></div>;

  if (!item) {
    content = (
      <div className="item__error">
        <p>
          Opss the item cannot be loaded. We are truly sorry, item was not found
        </p>
      </div>
    );
  } else {
    const handleAddToCart = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const cartItem: CartItem = {
        ...item,
        quantity: 1,
      };
      dispatch(addToCart(cartItem)); // function declaration is inside else block to prevent dispatching undefined
    };

    content = (
      <Link to={`/item/${item.id}`}>
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
          <h2 className="item__name">{item.name}</h2>{" "}
          <p className="item__description">
            {item.description.length < MAX_DESCRIPTION_LENGTH
              ? item.description
              : item.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."}
          </p>
          <p className="item__price">Price: {item.price} $</p>
          <MyButton
            className="item__add-to-cart-button"
            onClick={handleAddToCart}
          >
            Add to cart
          </MyButton>
        </main>
      </Link>
    );
  }
  return content;
};

export default Item;
