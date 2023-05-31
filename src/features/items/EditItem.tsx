import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectItemById } from "./itemsApiSlice";
import { RootState } from "../../app/store";

const EditItem = () => {
  const { id } = useParams();

  let content;

  if (!id) {
    content = <p>"Missing item id"</p>;
    alert("Missing item id");
  }
  if (id) {
    const item = useSelector((state: RootState) => selectItemById(state, id));
  }

  return <div>EditItem</div>;
};

export default EditItem;
