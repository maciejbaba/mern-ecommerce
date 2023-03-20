import { useSelector } from "react-redux";
import { selectItemById } from "./itemsApiSlice";

const Item = ({ id }) => {
  const item = useSelector((state) => selectItemById(state, id));

  return (
    <div>
      <img
        src={item.photoURL}
        alt={
          item.photoURL === "no-image.png"
            ? "Image didn't load"
            : `Photo of ${item.name}`
        }
      />
    </div>
  );
};

export default Item;
