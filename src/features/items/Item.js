import { useSelector } from "react-redux";
import { selectItemById } from "./itemsApiSlice";
import "../../css/Item.css"

const Item = ({ id }) => {
  const item = useSelector((state) => selectItemById(state, id));

  return (
    <div className="item-container">
      <img
      className="item-img"
        src={item.photoURL}
        alt={
          item.photoURL === "no-image.png"
            ? "Image didn't load"
            : `Photo of ${item.name}`
        }
      />
      <p className="description">
        {item.description}
      </p>
      <p className="price">Price: {item.price}</p>
    </div>
  );
};

export default Item;
